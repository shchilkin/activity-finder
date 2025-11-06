import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="mb-2 text-6xl font-bold text-gray-900 dark:text-gray-100">
            404
          </h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Activity Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The activity you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <Home className="size-4" />
          Back to Activities
        </Link>
      </div>
    </div>
  );
}
