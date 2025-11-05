import Link from 'next/link';

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
          className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Activities
        </Link>
      </div>
    </div>
  );
}
