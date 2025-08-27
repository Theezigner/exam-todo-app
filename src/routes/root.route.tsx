import {
  createRootRoute,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Layout } from "../layouts/layout"; 
import { ErrorComponent } from "../components/errorComponent"; 

export const rootRoute = createRootRoute({
 
  component: () => (
    <Layout/>
  ),
  errorComponent: (props: ErrorComponentProps) => <ErrorComponent {...props} />,
});
