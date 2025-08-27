import { useState } from "react";
import { useLoaderData, Link } from "@tanstack/react-router";
import { homeRoute } from "../routes/home.route";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { CreateTodoModal } from "../components/createTodoModal";
import { EditTodoModal } from "../components/editTodoModal";
import { DeleteTodoModal } from "../components/deleteTodoModal";
import { toast } from "react-hot-toast";
import { useHead } from "@unhead/react";
import type { Todo } from "../components/editTodoModal";

type HomeLoaderData = { todos: Todo[] };

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const todosPerPage = 10;
  const queryClient = useQueryClient();

  // Loader data
  const { todos: initialTodos } = useLoaderData({
    from: homeRoute.id,
  }) as HomeLoaderData;

  // Query cache
  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => initialTodos,
    initialData: initialTodos,
  });

  // Search + pagination
  const filteredData = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedTodos = filteredData.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );
  const totalPages = Math.max(1, Math.ceil(filteredData.length / todosPerPage));

  // Create
  const createTodoMutation = useMutation<Todo, Error, Omit<Todo, "id">>({
    mutationFn: async (newTodo) => {
      const res = await axiosInstance.post("/todos", newTodo);
      return res.data as Todo;
    },
    onSuccess: (serverTodo, variables) => {
      const next = serverTodo ?? ({ id: Date.now(), ...variables } as Todo);
      toast.success("Task added!");
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [next, ...old]);
    },
    onError: () => toast.error("Failed to add task."),
  });

  // Update
  const updateTodoMutation = useMutation<Todo | void, Error, Todo>({
    mutationFn: async (updatedTodo) => {
      const res = await axiosInstance.put(
        `/todos/${updatedTodo.id}`,
        updatedTodo
      );
      return res.data as Todo | void; // some backends return nothing
    },
    onSuccess: (serverTodo, variables) => {
      const next = (serverTodo as Todo) ?? variables;
      toast.success("Task updated!");
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((t) => (String(t.id) === String(next.id) ? next : t))
      );
    },
    onError: () => toast.error("Failed to update task."),
  });

  // Delete
  const deleteTodoMutation = useMutation<
    string | number,
    Error,
    string | number
  >({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/todos/${id}`);
      return id;
    },
    onSuccess: (id) => {
      toast.success("Task deleted!");
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((t) => String(t.id) !== String(id))
      );
    },
    onError: () => toast.error("Failed to delete task."),
  });

  // Handlers
  const handleAdd = (newTodo: Omit<Todo, "id">) => {
    createTodoMutation.mutate(newTodo);
  };

  const handleUpdate = (updatedTodo: Todo) => {
    updateTodoMutation.mutate(updatedTodo);
  };

  const handleDelete = (id: string | number) => {
    deleteTodoMutation.mutate(id);
  };

  // Head
  useHead({
    title: "Todo App-Home",
    meta: [
      {
        name: "description",
        content: "A simple and accessible todo application.",
      },
    ],
    link: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  });

  return (
    <main className="space-y-6 max-w-lg mx-auto px-4 py-6">
      <section className="flex justify-center">
        <form
          className="form-control w-full max-w-md"
          aria-label="Search todos"
        >
          <input
            type="text"
            className="input input-bordered input-sm w-full"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search todos by title"
          />
        </form>
      </section>

      <section className="flex justify-end">
        <CreateTodoModal onAdd={handleAdd} />
      </section>

      <section
        aria-label="Todo list"
        className="grid gap-4 rounded shadow-md bg-base-100 p-4"
      >
        {paginatedTodos.map((todo) => (
          <article
            key={todo.id}
            className="border-b border-base-300 pb-3 last:border-b-0"
            aria-label={`Todo: ${todo.title}`}
          >
            <header className="flex items-start gap-2 text-left">
              <h2 className="text-md font-semibold break-words">
                <Link
                  to="/todo/$id"
                  params={{ id: String(todo.id) }}
                  className="link link-hover"
                >
                  {todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}
                </Link>
              </h2>
              <EditTodoModal todo={todo} onUpdate={handleUpdate} />
            </header>

            <div className="flex items-center justify-between mt-1">
              <p>
                <span
                  className={`font-semibold ${
                    todo.completed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {todo.completed ? "Done" : "Not done"}
                </span>
              </p>
              <DeleteTodoModal todo={todo} onDelete={handleDelete} />
            </div>
          </article>
        ))}
      </section>

      <nav
        className="flex justify-center items-center gap-4 mt-6"
        aria-label="Pagination controls"
      >
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Prev
        </button>

        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next
        </button>
      </nav>
    </main>
  );
}
