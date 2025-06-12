import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { TodoDetailPage } from "../pages/todoDetailpage";
import { axiosInstance } from "../utils/axios";
import { ErrorComponent } from "../components/errorComponent";
import { queryClient } from "../utils/queryClient";

export const todoDetailRoute = createRoute({
  path: "/todo/$id",
  getParentRoute: () => rootRoute,
  component: TodoDetailPage,
  errorComponent: ErrorComponent,
  loader: async ({ params }) => {
    const id = Number(params.id);

    // 1. Check local query cache
    const cached = queryClient.getQueryData(["todos"]);
    const todo = cached?.find((t) => t.id === id);

    if (todo) {
      return { todo };
    }

    try {
      const res = await axiosInstance.get(`/todos/${id}`);
      return { todo: res.data };
    } catch {
      const { db } = await import("../utils/dexieDB");
      const offline = await db.todos.get(id);
      if (offline) return { todo: offline };

      throw new Error("Todo not found.");
    }
  },
});



