import { redirect } from 'next/navigation';
import connectDB from '@/lib/database';
import Url from '@/models/Url';

interface PageProps {
  params: {
    shortCode: string;
  };
}

export default async function ShortCodePage({ params }: PageProps) {
  const { shortCode } = params;

  try {
    console.log(`Looking for short code: ${shortCode}`);
    
    // Connect to database
    await connectDB();
    console.log('Database connected for redirect lookup');

    // Find URL by short code
    const url = await Url.findOne({ 
      shortCode, 
      isActive: true 
    });

    console.log(`URL lookup result:`, url ? 'Found' : 'Not found');

    if (!url) {
      console.log(`URL not found for short code: ${shortCode}`);
      // If the URL doesn't exist, redirect to home with error
      redirect('/?error=url-not-found');
    }

    console.log(`Found URL: ${url.originalUrl}`);

    // Update click count and last accessed time
    await Url.findByIdAndUpdate(url._id, {
      $inc: { clickCount: 1 },
      lastAccessed: new Date(),
    });

    console.log(`Updated click count for ${shortCode}`);

    // Redirect to original URL
    redirect(url.originalUrl);

  } catch (error) {
    console.error('Error redirecting:', error);
    
    // Don't throw the redirect error as it's expected
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error; // Re-throw redirect errors
    }
    
    redirect('/?error=redirect-failed');
  }
} 