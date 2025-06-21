'use client';

import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-secondary-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">ShotLinks</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              FAQ
            </Link>
            {isSignedIn && (
              <Link href="/history" className="text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                History
              </Link>
            )}
          </div>

          {/* Desktop Auth and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                // signOutCallback={() => {
                //   // Force a page reload after sign out
                //   window.location.href = '/';
                // }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200 dark:border-gray-700">
              <Link
                href="/"
                className="block px-3 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              {isSignedIn && (
                <Link
                  href="/history"
                  className="block px-3 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
              )}
              <div className="flex items-center justify-between px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  <span className="ml-2">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>
              <div className="px-3 py-2">
                {isSignedIn ? (
                  <UserButton 
                    afterSignOutUrl="/"
                    // signOutCallback={() => {
                    //   // Force a page reload after sign out
                    //   window.location.href = '/';
                    // }}
                  />
                ) : (
                  <SignInButton mode="modal">
                    <button className="btn-primary w-full">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 