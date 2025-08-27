import { Link } from "@tanstack/react-router";
import { useHead } from "@unhead/react";

export function NotFoundPage() {

    useHead({
    title: 'Not Found',
    meta: [
      { name: 'description', content: 'Page not found.' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  });

  return (
    <main className="min-h-screen px-4 py-10 text-center space-y-4">
      <section role="alert" aria-labelledby="not-found-title">
        <h1
          id="not-found-title"
          className="text-4xl font-bold text-red-600 mb-3"
        >
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="btn btn-outline btn-primary"
          aria-label="Go back to the Todo List"
        >
          Back to Todo List
        </Link>
      </section>
    </main>
  );
}
