import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import Url from '@/models/Url';
import { generateShortCode, isValidUrl } from '@/lib/utils';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { originalUrl, shortCode: customCode } = body;

    // Validate input
    if (!originalUrl || typeof originalUrl !== 'string') {
      return NextResponse.json(
        { message: 'Original URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!isValidUrl(originalUrl)) {
      return NextResponse.json(
        { message: 'Please provide a valid URL' },
        { status: 400 }
      );
    }

    // Rate limiting only for non-authenticated users
    if (!userId) {
      const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
      const lastRequest = rateLimitStore.get(clientIP);
      const now = Date.now();
      
      if (lastRequest && now - lastRequest < 60000) { // 1 minute limit
        return NextResponse.json(
          { message: 'Rate limit exceeded. Please sign in for unlimited access.' },
          { status: 429 }
        );
      }
      
      rateLimitStore.set(clientIP, now);
    }

    // Connect to database
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');

    let shortCode: string;

    if (customCode) {
      // Validate custom code
      if (!/^[a-zA-Z0-9-]{1,}$/.test(customCode)) {
        return NextResponse.json(
          { message: 'Custom alias must be at least 1 character long and contain only letters, numbers, and hyphens.' },
          { status: 400 }
        );
      }
      
      const existing = await Url.findOne({ shortCode: customCode });
      if (existing) {
        return NextResponse.json(
          { message: 'This custom alias is already in use. Please choose another one.' },
          { status: 409 } // 409 Conflict
        );
      }
      shortCode = customCode;
    } else {
      // Generate unique short code
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10;
      let generatedCode = '';

      while (!isUnique && attempts < maxAttempts) {
        generatedCode = generateShortCode(6);
        const existingUrl = await Url.findOne({ shortCode: generatedCode });
        
        if (!existingUrl) {
          isUnique = true;
        } else {
          attempts++;
        }
      }

      if (!isUnique) {
        return NextResponse.json(
          { message: 'Failed to generate unique short code. Please try again.' },
          { status: 500 }
        );
      }
      shortCode = generatedCode;
    }

    // Create new URL record or update existing one
    console.log('Creating new URL record...');
    
    let url;
    
    if (userId) {
      // For authenticated users, always create new document
      url = new Url({
        originalUrl,
        shortCode,
        userId,
        clickCount: 0,
        createdAt: new Date(),
        isActive: true,
      });
      await url.save();
      console.log('URL saved successfully for authenticated user');
    } else {
      // For anonymous users (userId = null), check if there's an existing document and overwrite it
      const existingUrl = await Url.findOne({ userId: null, isActive: true });
      
      if (existingUrl) {
        // Update existing anonymous document with new data
        console.log('Updating existing anonymous URL record...');
        url = await Url.findByIdAndUpdate(
          existingUrl._id,
          {
            originalUrl,
            shortCode,
            userId: null,
            clickCount: 0, // Reset click count for new URL
            createdAt: new Date(),
            lastAccessed: null, // Reset last accessed time
            isActive: true,
          },
          { new: true } // Return the updated document
        );
        console.log('Anonymous URL updated successfully');
      } else {
        // Create new document for anonymous user
        url = new Url({
          originalUrl,
          shortCode,
          userId: null,
          clickCount: 0,
          createdAt: new Date(),
          isActive: true,
        });
        await url.save();
        console.log('URL saved successfully for anonymous user');
      }
    }

    return NextResponse.json({
      message: 'URL shortened successfully',
      shortCode,
      originalUrl,
      shortUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${shortCode}`,
    });

  } catch (error) {
    console.error('Error creating short URL:', error);
    
    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes('db already exists with different case')) {
        return NextResponse.json(
          { message: 'Database configuration error. Please check your MongoDB connection.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { message: error.message || 'Failed to create short URL' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 