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

    
    const cachedTodos = queryClient.getQueryData(["todos"]);
    const localMatch = cachedTodos?.find((todo) => todo.id === id);

    if (localMatch) return { todo: localMatch };

    try {
      const res = await axiosInstance.get(`/todos/${id}`);
      return { todo: res.data };
    } catch (err) {
      throw new Error("Todo not found.");
    }
  },
});


