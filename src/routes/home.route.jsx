import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { HomePage } from "../pages/homePage.jsx";
import { axiosInstance } from "../utils/axios";
import { db } from "../utils/dexieDB.js";
import { ErrorComponent } from "../components/errorComponent.jsx";
import { queryClient } from "../utils/queryClient";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,

  loader: async () => {
    try {
      // Try to fetch from API
      const res = await axiosInstance.get("/todos");
      const todos = res.data;

      // Save to Dexie for offline fallback
      await db.todos.clear();
      await db.todos.bulkPut(todos);

      // Cache in React Query for later reuse
      queryClient.setQueryData(["todos"], todos);

      return { todos };
    } catch (error) {
      // If offline or error, fallback to Dexie
      const offlineTodos = await db.todos.toArray();

      // Also cache offline data
      queryClient.setQueryData(["todos"], offlineTodos);

      return { todos: offlineTodos };
    }
  },

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
