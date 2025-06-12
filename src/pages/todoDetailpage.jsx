import { useLoaderData, Link } from "@tanstack/react-router";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export function TodoDetailPage() {
  const { todo } = useLoaderData({ from: "/todo/$id" });

  return (
    <main className="max-w-sm mx-auto p-4 space-y-4">
      <article className="border rounded bg-base-100 shadow-md space-y-3 p-4">
        <header>
          <h2 className="text-xl font-bold">Task Details</h2>
        </header>

        <p><strong>Title:</strong> {todo.title}</p>

        <p className="flex flex-row gap-2 justify-center">
          <strong>Status:</strong>{" "}
          {todo.completed ? (
            <span className="flex justify-center items-center gap-1 text-green-600">
              <FaCheckCircle /> Completed
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1 text-red-600">
              <FaTimesCircle /> Not Completed
            </span>
          )}
        </p>
      </article>

      <footer className="flex justify-center">
        <Link to="/" className="btn btn-sm btn-outline">
          Back to Todo List
        </Link>
      </footer>
    </main>
  );
}



