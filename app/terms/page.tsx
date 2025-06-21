import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="card">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-secondary max-w-none">
            <p className="text-secondary-600 dark:text-gray-300 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                By accessing and using ShotLinks ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                ShotLinks is a URL shortening service that allows users to create shorter, more manageable links from long URLs. The service is provided "as is" and we make no warranties about the reliability or availability of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                3. User Responsibilities
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Ensuring that the URLs you shorten are legal and do not violate any laws or regulations</li>
                <li>Not using the service for spam, phishing, or other malicious activities</li>
                <li>Not attempting to circumvent any rate limits or security measures</li>
                <li>Maintaining the security of your account credentials</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                4. Prohibited Uses
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                You may not use the Service to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Create links to illegal content, including but not limited to malware, phishing sites, or content that infringes on intellectual property rights</li>
                <li>Engage in spam or unsolicited commercial communications</li>
                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Use the service in a way that could damage, disable, or impair the service</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                5. Privacy and Data
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We collect and process data in accordance with our Privacy Policy. By using the Service, you consent to our collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                6. Service Availability
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We strive to maintain high availability of our service, but we do not guarantee that the service will be available at all times. We may temporarily suspend the service for maintenance or other reasons.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                In no event shall ShotLinks be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                8. Termination
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                10. Contact Information
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-secondary-600 dark:text-gray-300">
                Email: legal@shotlinks.com<br />
                Address: [Your Company Address]
              </p>
            </section>

            <div className="border-t border-secondary-200 dark:border-gray-600 pt-6 mt-8">
              <Link
                href="/"
                className="btn-primary inline-flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 