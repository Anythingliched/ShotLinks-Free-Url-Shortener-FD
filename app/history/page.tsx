'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, Copy, ExternalLink, Trash2, Calendar, BarChart3, ArrowUpDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatDate, truncateText, copyToClipboard } from '@/lib/utils';

interface UrlRecord {
  _id: string;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
  lastAccessed?: string;
}

export default function HistoryPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [urls, setUrls] = useState<UrlRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'clickCount'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn) {
      fetchUrls();
    }
  }, [isSignedIn, currentPage, sortBy, sortOrder, searchTerm]);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sortBy,
        sortOrder,
        search: searchTerm,
      });

      const response = await fetch(`/api/urls/history?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUrls(data.urls);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      toast.error('Failed to load URLs');
      console.error('Error fetching URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) return;

    try {
      setDeletingId(id);
      const response = await fetch(`/api/urls/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete URL');
      }

      setUrls(urls.filter(url => url._id !== id));
      toast.success('URL deleted successfully');
    } catch (error) {
      toast.error('Failed to delete URL');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopy = async (shortCode: string) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    const success = await copyToClipboard(shortUrl);
    if (success) {
      toast.success('URL copied to clipboard!');
    } else {
      toast.error('Failed to copy URL');
    }
  };

  const handleSort = (field: 'createdAt' | 'clickCount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen gradient-bg">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">URL History</h1>
          <p className="text-secondary-600 dark:text-gray-300">Manage and track your shortened URLs</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search URLs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('createdAt')}
                className={`btn-secondary flex items-center space-x-2 ${
                  sortBy === 'createdAt' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : ''
                }`}
              >
                <Calendar size={16} />
                <span>Date</span>
                <ArrowUpDown size={14} />
              </button>
              <button
                onClick={() => handleSort('clickCount')}
                className={`btn-secondary flex items-center space-x-2 ${
                  sortBy === 'clickCount' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : ''
                }`}
              >
                <BarChart3 size={16} />
                <span>Clicks</span>
                <ArrowUpDown size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* URLs Table */}
        <div className="card">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : urls.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary-600 dark:text-gray-300 mb-4">No URLs found</p>
              <p className="text-sm text-secondary-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by creating your first shortened URL'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-secondary-200 dark:border-gray-600 bg-secondary-50 dark:bg-gray-800">
                      <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-gray-300">Original URL</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-gray-300">Short URL</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-gray-300">Clicks</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-gray-300">Created</th>
                      <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((url) => (
                      <tr key={url._id} className="border-b border-secondary-100 dark:border-gray-700 hover:bg-secondary-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4">
                          <div className="max-w-xs flex items-center space-x-2">
                            <a
                              href={url.originalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 dark:text-primary-400 hover:underline"
                              title={url.originalUrl}
                            >
                              <ExternalLink size={16} />
                            </a>
                            <p className="text-secondary-900 dark:text-white font-medium break-all">
                              {truncateText(url.originalUrl, 50)}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-secondary-900 dark:text-white font-mono text-sm">
                              {window.location.origin}/{url.shortCode}
                            </span>
                            <button
                              onClick={() => handleCopy(url.shortCode)}
                              className="text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-secondary-900 dark:text-white font-medium">
                            {url.clickCount}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-secondary-600 dark:text-gray-300 text-sm">
                            {formatDate(url.createdAt)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDelete(url._id)}
                            disabled={deletingId === url._id}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6 pt-6 border-t border-secondary-200 dark:border-gray-600">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-secondary-600 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 