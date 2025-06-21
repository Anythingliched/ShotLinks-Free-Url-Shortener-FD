import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Url from '@/models/Url';

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    const { shortCode } = params;

    if (!shortCode) {
      return NextResponse.json(
        { message: 'Short code is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find URL by short code
    const url = await Url.findOne({ 
      shortCode, 
      isActive: true 
    });

    if (!url) {
      return NextResponse.json(
        { message: 'URL not found' },
        { status: 404 }
      );
    }

    // Update click count and last accessed time
    await Url.findByIdAndUpdate(url._id, {
      $inc: { clickCount: 1 },
      lastAccessed: new Date(),
    });

    // Check if this is an API request or direct page visit
    const acceptHeader = request.headers.get('accept');
    const isApiRequest = acceptHeader?.includes('application/json');

    if (isApiRequest) {
      // Return JSON response for API calls
      return NextResponse.json({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        redirectUrl: url.originalUrl,
      });
    } else {
      // Redirect directly for browser requests
      return NextResponse.redirect(url.originalUrl);
    }

  } catch (error) {
    console.error('Error redirecting URL:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 