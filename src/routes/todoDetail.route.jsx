import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { TodoDetailPage } from "../pages/todoDetailpage";
import { axiosInstance } from "../utils/axios";
import { ErrorComponent } from "../components/errorComponent.jsx";

export const todoDetailRoute = createRoute({
  path: "/todo/$id", 
  getParentRoute: () => rootRoute,
  component: TodoDetailPage,
  errorComponent: ErrorComponent,
  loader: async ({ params }) => {
    const res = await axiosInstance.get(`/todos/${params.id}`);
    console.log("params.id:", params.id);
    return { todo: res.data };
  },
  pendingComponent: () => (
    <section
      role="status"
      aria-live="polite"
      className="p-4 text-center text-gray-500"
    >
      Loading todo details...
    </section>
  )
});

