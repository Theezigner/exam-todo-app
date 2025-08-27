import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const storedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);

  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <nav aria-label="Theme toggle control">
      <button
        className="btn btn-sm absolute right-3 p-2"
        onClick={toggleTheme}
        aria-label="Toggle dark/light mode"
      >
        {theme === "light" ? <FiMoon /> : <FiSun />}
        <span className="ml-1 hidden md:inline">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </span>
      </button>
    </nav>
  );
}
