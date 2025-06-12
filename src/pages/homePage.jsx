import { useState } from "react";
import { useLoaderData, Link } from "@tanstack/react-router";
import { homeRoute } from "../routes/home.route";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { CreateTodoModal } from "../components/createTodoModal";
import { EditTodoModal } from "../components/editTodoModal";
import { DeleteTodoModal } from "../components/deleteTodoModal";
import { toast } from "react-hot-toast";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;
  const queryClient = useQueryClient();

  const { todos: initialTodos } = useLoaderData({ from: homeRoute.id });
  const [todos, setTodos] = useState(initialTodos || []);

  const filteredData = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTodos = filteredData.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  const totalPages = Math.ceil(filteredData.length / todosPerPage);

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await axiosInstance.post("/todos", newTodo);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Task Added!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to add task."),
  });

  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo) => {
      const res = await axiosInstance.put(`/todos/${updatedTodo.id}`, updatedTodo);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Task updated!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to update task."),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/todos/${id}`);
      return id;
    },
    onSuccess: () => {
      toast.success("Task deleted!");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => toast.error("Failed to delete task."),
  });

  const handleAdd = (newTodo) => {
    createTodoMutation.mutate(newTodo);
    setTodos(prev => [newTodo, ...prev]);
  };

  const handleUpdate = (updatedTodo) => {
    updateTodoMutation.mutate(updatedTodo);
    setTodos(prev => prev.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const handleDelete = (id) => {
    deleteTodoMutation.mutate(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <main className="space-y-6 max-w-md mx-auto px-4 py-6">
      <section aria-label="Search todos" className="form-control">
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search todos by title"
        />
      </section>

      <section className="flex justify-end">
        <CreateTodoModal onAdd={handleAdd} />
      </section>

      <section aria-label="Todo list" className="grid gap-4 rounded shadow-md bg-base-100 p-4">
        {paginatedTodos.map(todo => (
          <article
            key={todo.id}
            className="border-b border-base-300 pb-3 last:border-b-0"
            aria-label={`Todo: ${todo.title}`}
          >
            <header className="flex items-start gap-2 text-left">
              <h2 className="text-md font-semibold break-words">
                <Link
                  to={`/todo/${todo.id}`}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next
        </button>
      </nav>
    </main>
  );
}
