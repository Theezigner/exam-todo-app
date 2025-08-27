import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { homeRoute } from "./home.route";
import { todoDetailRoute } from "./todoDetail.route";
import { notFoundRoute } from "./notFound.route"

const routeTree = rootRoute.addChildren([
    homeRoute,
    todoDetailRoute,
    notFoundRoute
]);

export const router = createRouter({ routeTree });
