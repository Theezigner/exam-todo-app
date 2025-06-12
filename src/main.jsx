import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { ErrorBoundary } from "./components/errorBoundary.jsx";
import { createHead, UnheadProvider } from '@unhead/react/client'

const head = createHead()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <UnheadProvider head={head}>
        <App />
      </UnheadProvider>
    </ErrorBoundary>
  </StrictMode>
);
