import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { HomePage } from "../pages/homePage";
import { axiosInstance } from "../utils/axios";
import { db } from "../utils/dexieDB";
import { ErrorComponent } from "../components/errorComponent";
import { queryClient } from "../utils/queryClient";
import type { Todo } from "../utils/dexieDB"; // ← use the same Todo type as Dexie

export type HomeLoaderData = { todos: Todo[] };

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,

  loader: (async (): Promise<HomeLoaderData> => {
    try {
      const res = await axiosInstance.get<Todo[]>("/todos");
      const todos = res.data;

      await db.todos.clear();
      await db.todos.bulkPut(todos);

      queryClient.setQueryData<Todo[]>(["todos"], todos);
      return { todos };
    } catch (error) {
      console.warn("Falling back to offline todos:", error);
      const offlineTodos = await db.todos.toArray(); // typed as Todo[]

      queryClient.setQueryData<Todo[]>(["todos"], offlineTodos);
      return { todos: offlineTodos };
    }
  }) satisfies () => Promise<HomeLoaderData>,

  pendingComponent: () => (
    <section
      role="status"
      aria-live="polite"
      className="p-4 text-center text-gray-500"
    >
      ⏳ Loading todos...
    </section>
  ),

  errorComponent: ErrorComponent,
});
