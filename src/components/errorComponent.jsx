import { Link } from "@tanstack/react-router";

export function ErrorComponent({ error }) {
  return (
    <main
      role="alert"
      aria-live="assertive"
      className="p-4 text-red-600"
    >
      <header>
        <h2 className="font-bold text-lg">🚫 Error</h2>
      </header>
      <p>{error.message || "Something went wrong."}</p>
      <footer className="mt-4">
        <Link to="/" className="btn btn-sm btn-outline">
          Back to Todo List
        </Link>
      </footer>
    </main>
  );
}

