import Navigation from '@/components/Navigation';
import UrlShortener from '@/components/UrlShortener';
import Footer from '@/components/Footer';
import { Zap, Shield, BarChart3, Users, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  searchParams: {
    error?: string;
  };
}

export default function HomePage({ searchParams }: PageProps) {
  const { error } = searchParams;

  const getErrorMessage = (errorType: string) => {
    switch (errorType) {
      case 'url-not-found':
        return 'The shortened URL you are looking for does not exist or has been deleted.';
      case 'redirect-failed':
        return 'Failed to redirect to the original URL. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {getErrorMessage(error)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 dark:text-white mb-6">
            Shorten URLs with{' '}
            <span className="text-primary-600 dark:text-primary-400">ShotLinks</span>
          </h1>
          <p className="text-xl text-secondary-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Create short, memorable links that are easy to share. 
            Fast, reliable, and secure URL shortening service.
          </p>
          
          {/* URL Shortener Component */}
          <UrlShortener />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Why Choose ShotLinks?
            </h2>
            <p className="text-lg text-secondary-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features to make your links work harder for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-secondary-600 dark:text-gray-300">
                Create short links instantly with our optimized platform
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Secure & Reliable
              </h3>
              <p className="text-secondary-600 dark:text-gray-300">
                Your links are protected with enterprise-grade security
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                Analytics
              </h3>
              <p className="text-secondary-600 dark:text-gray-300">
                Track clicks and performance with detailed analytics
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                User Friendly
              </h3>
              <p className="text-secondary-600 dark:text-gray-300">
                Simple interface designed for the best user experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-secondary-600 dark:text-gray-300 mb-8">
            Join thousands of users who trust ShotLinks for their URL shortening needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="btn-primary inline-flex items-center justify-center"
            >
              Learn More
            </Link>
            <Link
              href="/faq"
              className="btn-secondary inline-flex items-center justify-center"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 