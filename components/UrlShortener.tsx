'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Link, Copy, ExternalLink, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { urlSchema } from '@/lib/utils';
import { copyToClipboard } from '@/lib/utils';

interface ShortenedUrl {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
}

export default function UrlShortener() {
  const { isSignedIn } = useUser();
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate URL
      const validatedUrl = urlSchema.parse({ url });
      
      setIsLoading(true);
      
      const response = await fetch('/api/urls/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl: validatedUrl.url,
          shortCode: customCode || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to shorten URL');
      }

      setShortenedUrl({
        originalUrl: validatedUrl.url,
        shortCode: data.shortCode,
        shortUrl: `${origin}/${data.shortCode}`,
      });
      
      setUrl('');
      setCustomCode('');
      toast.success('URL shortened successfully!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortenedUrl) return;
    
    const success = await copyToClipboard(shortenedUrl.shortUrl);
    if (success) {
      setCopied(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy URL');
    }
  };

  const handleVisit = () => {
    if (!shortenedUrl) return;
    window.open(shortenedUrl.shortUrl, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url-that-needs-shortening"
            className="input-field w-full"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
            Custom alias (optional)
          </label>
          <div className="relative">
            <input
              type="text"
              id="customCode"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="my-awesome-link"
              className="input-field w-full"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Shortening...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Link size={16} />
              <span>Shorten URL</span>
            </div>
          )}
        </button>

        {!isSignedIn && (
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
            <p className="text-sm text-primary-700 dark:text-primary-300">
              💡 <strong>Sign in</strong> to save your shortened URLs and access your history!
            </p>
          </div>
        )}
      </form>

      {/* Shortened URL Preview */}
      {shortenedUrl && (
        <div className="mt-8 animate-slide-up">
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Your shortened URL
            </h3>
            
            <div className="space-y-4">
              {/* Original URL */}
              <div>
                <label className="block text-sm font-medium text-secondary-600 dark:text-gray-300 mb-1">
                  Original URL
                </label>
                <p className="text-sm text-secondary-700 dark:text-gray-300 break-all">
                  {shortenedUrl.originalUrl}
                </p>
              </div>

              {/* Shortened URL */}
              <div>
                <label className="block text-sm font-medium text-secondary-600 dark:text-gray-300 mb-1">
                  Shortened URL
                </label>
                <div className="flex items-center gap-2 p-3 bg-secondary-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-primary-600 dark:text-primary-400 font-mono text-sm flex-1">
                    {shortenedUrl.shortUrl}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    title="Copy URL"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleVisit}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ExternalLink size={16} />
                  <span>Visit Link</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Copy size={16} />
                  <span>{copied ? 'Copied!' : 'Copy URL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 