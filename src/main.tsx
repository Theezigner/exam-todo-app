import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ErrorBoundary } from "./components/errorBoundary";
import { createHead, UnheadProvider } from "@unhead/react/client";

const head = createHead();
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found");
}

createRoot(container).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </UnheadProvider>
  </StrictMode>
);
