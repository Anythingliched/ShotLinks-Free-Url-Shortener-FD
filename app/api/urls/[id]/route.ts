import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/database';
import Url from '@/models/Url';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: 'URL ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find URL and verify ownership
    const url = await Url.findOne({ _id: id, userId, isActive: true });

    if (!url) {
      return NextResponse.json(
        { message: 'URL not found or access denied' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false
    await Url.findByIdAndUpdate(id, { isActive: false });

    return NextResponse.json({
      message: 'URL deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting URL:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 