export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-secondary-200 dark:border-gray-700 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold text-secondary-900 dark:text-white">ShotLinks</span>
          </div>
          <p className="text-secondary-600 dark:text-gray-400 mb-4">
            Create short, memorable links that work everywhere
          </p>
          <p className="text-sm text-secondary-500 dark:text-gray-500">
            © {new Date().getFullYear()} ShotLinks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 