import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="card">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-secondary max-w-none">
            <p className="text-secondary-600 dark:text-gray-300 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                1. Information We Collect
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">Account Information:</h3>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-1">
                <li>Email address and authentication details (when you sign up)</li>
                <li>Profile information you choose to provide</li>
                <li>Account preferences and settings</li>
              </ul>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">Usage Information:</h3>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-1">
                <li>URLs you shorten and their associated short codes</li>
                <li>Click counts and analytics data</li>
                <li>IP addresses and browser information</li>
                <li>Usage patterns and service interactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Provide, maintain, and improve our URL shortening service</li>
                <li>Process and store your shortened URLs</li>
                <li>Track click analytics and provide usage statistics</li>
                <li>Send you service-related communications</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage patterns to improve our service</li>
                <li>Detect and prevent fraud, abuse, and security threats</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                3. Information Sharing
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our service</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, user information may be transferred</li>
                <li><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                4. Data Security
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Monitoring for suspicious activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                5. Data Retention
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically:
              </p>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Account information is retained while your account is active</li>
                <li>Shortened URLs are retained until you delete them or your account is closed</li>
                <li>Analytics data is retained for service improvement purposes</li>
                <li>We may retain certain information for legal or regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                6. Your Rights
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-secondary-600 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain processing of your information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies to enhance your experience and collect usage information. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                10. Contact Us
              </h2>
              <p className="text-secondary-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-secondary-600 dark:text-gray-300">
                Email: privacy@shotlinks.com<br />
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