import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle, Users, Globe, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            About ShotLinks
          </h1>
          <p className="text-xl text-secondary-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're on a mission to make the web more accessible by creating simple, 
            reliable, and secure URL shortening solutions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-secondary-600 dark:text-gray-300 mb-6">
            At ShotLinks, we believe that sharing information should be effortless. 
            Our platform transforms long, unwieldy URLs into short, memorable links 
            that are easy to share across all your favorite platforms.
          </p>
          <p className="text-secondary-600 dark:text-gray-300">
            Whether you're a social media influencer, a business professional, or 
            just someone who wants to share links more efficiently, ShotLinks provides 
            the tools you need to make your links work harder for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">Global Reach</h3>
            </div>
            <p className="text-secondary-600 dark:text-gray-300">
              Our infrastructure spans the globe, ensuring fast and reliable 
              service for users worldwide, 24/7.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">Enterprise Security</h3>
            </div>
            <p className="text-secondary-600 dark:text-gray-300">
              Your links and data are protected with industry-leading security 
              measures and privacy controls.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">User-First Design</h3>
            </div>
            <p className="text-secondary-600 dark:text-gray-300">
              Every feature is designed with our users in mind, ensuring an 
              intuitive and enjoyable experience.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">Reliable Service</h3>
            </div>
            <p className="text-secondary-600 dark:text-gray-300">
              With 99.9% uptime and redundant systems, your links will always 
              be available when you need them.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
            ShotLinks by the Numbers
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">10M+</div>
              <div className="text-secondary-600 dark:text-gray-300">Links Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">500K+</div>
              <div className="text-secondary-600 dark:text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.9%</div>
              <div className="text-secondary-600 dark:text-gray-300">Uptime</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Our Team</h2>
          <p className="text-secondary-600 dark:text-gray-300 mb-6">
            ShotLinks is built by a passionate team of developers, designers, and 
            product specialists who are committed to creating the best URL shortening 
            experience possible.
          </p>
          <p className="text-secondary-600 dark:text-gray-300">
            We're constantly innovating and improving our platform based on user 
            feedback and the latest technology trends. Our goal is to make URL 
            shortening as simple and powerful as possible.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-secondary-600 dark:text-gray-300 mb-6">
            Join thousands of users who trust ShotLinks for their URL shortening needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn-primary inline-flex items-center justify-center"
            >
              Start Shortening URLs
            </Link>
            <Link
              href="/faq"
              className="btn-secondary inline-flex items-center justify-center"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 