import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { NotFoundPage } from "../pages/notFoundPage";

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});
