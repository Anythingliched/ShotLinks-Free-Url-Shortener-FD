'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronDown, ChevronUp, MessageCircle, ArrowLeft } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is ShotLinks?",
    answer: "ShotLinks is a URL shortening service that transforms long, unwieldy URLs into short, memorable links. It's designed to make sharing links easier and more efficient across all platforms."
  },
  {
    question: "How does URL shortening work?",
    answer: "When you submit a long URL, our system generates a unique short code (6-8 characters) and creates a mapping between your original URL and the short code. When someone visits the shortened URL, they're automatically redirected to the original destination."
  },
  {
    question: "Are my shortened URLs permanent?",
    answer: "Yes, your shortened URLs are permanent and will continue to work as long as the original destination URL remains active. We maintain a 99.9% uptime guarantee for our service."
  },
  {
    question: "Is ShotLinks free to use?",
    answer: "Yes, ShotLinks is completely free to use! You can create unlimited shortened URLs without any cost. We also offer premium features for power users and businesses."
  },
  {
    question: "Do I need to create an account?",
    answer: "No, you can use ShotLinks without creating an account. However, signing up allows you to save your URLs, track analytics, and manage your link history."
  },
  {
    question: "Can I track clicks on my shortened URLs?",
    answer: "Yes! When you're signed in, you can view detailed analytics for all your shortened URLs, including click counts, creation dates, and last accessed times."
  },
  {
    question: "Are there any rate limits?",
    answer: "Non-authenticated users have a rate limit of one URL per minute to prevent abuse. Authenticated users have unlimited access to create URLs."
  },
  {
    question: "Can I delete my shortened URLs?",
    answer: "Yes, if you're signed in, you can delete any URLs you've created from your history page. Deleted URLs will no longer redirect to the original destination."
  },
  {
    question: "Is ShotLinks secure?",
    answer: "Absolutely! We use enterprise-grade security measures to protect your data. All URLs are encrypted, and we don't store any personal information beyond what's necessary for the service."
  },
  {
    question: "What happens if the original URL is broken?",
    answer: "If the original URL becomes unavailable, visitors to your shortened link will see an error page. We recommend regularly checking your links to ensure they're still working."
  },
  {
    question: "Can I customize my short URLs?",
    answer: "Currently, we generate random short codes for all URLs. Custom short codes are a feature we're working on for future releases."
  },
  {
    question: "How long are the shortened URLs?",
    answer: "Our shortened URLs are typically 6-8 characters long, making them much shorter and easier to share than the original URLs."
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-secondary-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about ShotLinks and URL shortening.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mb-12">
          {faqData.map((item, index) => (
            <div key={index} className="card">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white pr-4">
                  {item.question}
                </h3>
                <span className="transform transition-transform duration-[420ms]">
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-secondary-600 dark:text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-secondary-600 dark:text-gray-400 flex-shrink-0" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-[420ms] ease-in-out ${
                  openItems.includes(index) ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-gray-600">
                  <p className="text-secondary-600 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-secondary-600 dark:text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
            <Link
              href="/"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 