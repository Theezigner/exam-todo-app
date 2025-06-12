
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Layout } from '../layouts/layout.jsx';
import { ErrorBoundary } from '../components/errorBoundary'; 

export const rootRoute = createRootRoute({
  component: Layout,
  errorComponent: ErrorBoundary,
});


