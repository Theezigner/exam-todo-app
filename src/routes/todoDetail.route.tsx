import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { TodoDetailPage } from "../pages/todoDetailpage"; 
import { axiosInstance } from "../utils/axios";
import { ErrorComponent } from "../components/errorComponent";
import { queryClient } from "../utils/queryClient";

export type Todo = { id: number | string; title: string; completed: boolean };
export type TodoDetailLoaderData = { todo: Todo };

export const todoDetailRoute = createRoute({
  path: "/todo/$id",
  getParentRoute: () => rootRoute,
  component: TodoDetailPage,
  errorComponent: ErrorComponent,

  // Typed loader with cache -> network -> offline fallback
  loader: async ({ params }): Promise<TodoDetailLoaderData> => {
    const rawId = params.id; // always string from the URL
    const key: string | number = /^\d+$/.test(rawId) ? Number(rawId) : rawId;

    // 1) Try React Query cache first
    const cached = queryClient.getQueryData<Todo[]>(["todos"]) ?? [];
    const fromCache = cached.find((t) => String(t.id) === String(key));
    if (fromCache) {
      return { todo: fromCache };
    }

    // 2) Network fetch
    try {
      const res = await axiosInstance.get<Todo>(
        `/todos/${encodeURIComponent(rawId)}`
      );
      return { todo: res.data };
    } catch {
      // 3) Offline fallback (Dexie)
      const { db } = await import("../utils/dexieDB");
      const offline = await db.todos.get(key as any); // Table<Todo, number|string>
      if (offline) return { todo: offline };

      throw new Error("Todo not found.");
    }
  },
});
