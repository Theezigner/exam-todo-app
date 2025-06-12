import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { queryClient } from "./utils/queryClient";
import "./App.css";

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <RouterProvider router={router} />
      </main>

      <aside aria-live="polite" aria-atomic="true">
        <Toaster position="top-right" />
      </aside>
    </QueryClientProvider>
  );
}



