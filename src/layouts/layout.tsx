import { ThemeToggle } from "../components/themeToggle";
import { Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <main className="relative">
      <header className="flex flex-col">
        <ThemeToggle />
        <h1 className="text-2xl font-bold mt-10 mb-4">Todo App</h1>
      </header>
      <Outlet />
    </main>
  );
}

