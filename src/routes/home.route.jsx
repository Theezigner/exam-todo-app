import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { HomePage } from "../pages/homePage.jsx";
import { axiosInstance } from "../utils/axios";
import { db } from "../utils/dexieDB.js"
import { ErrorComponent } from "../components/errorComponent.jsx";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  loader: async () => {
    try {
      const res = await axiosInstance.get("/todos");
      const todos = res.data;

      // Save to Dexie for offline fallback
      await db.todos.clear();
      await db.todos.bulkPut(todos);

      return { todos };
    } catch (error) {
      // If offline or API fails, load from Dexie
      const offlineTodos = await db.todos.toArray();
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



