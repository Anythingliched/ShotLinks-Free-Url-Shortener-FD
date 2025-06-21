import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import Url from '@/models/Url';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const search = searchParams.get('search') || '';

    // Validate parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { message: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Build query
    const query: any = { userId, isActive: true };
    
    if (search) {
      query.$or = [
        { originalUrl: { $regex: search, $options: 'i' } },
        { shortCode: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Execute queries
    const [urls, total] = await Promise.all([
      Url.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('originalUrl shortCode clickCount createdAt lastAccessed')
        .lean(),
      Url.countDocuments(query),
    ]);

    return NextResponse.json({
      urls,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error('Error fetching URL history:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 