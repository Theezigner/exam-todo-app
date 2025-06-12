import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global Error Caught:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      let errorMessage = "An unexpected error occurred.";

      if (error?.message?.includes("Network Error")) {
        errorMessage = "You appear to be offline. Please check your connection.";
      } else if (error?.message?.includes("404")) {
        errorMessage = "The page you are looking for could not be found.";
      } else if (error?.message?.includes("500")) {
        errorMessage = "Internal server error. Please try again later.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      return (
        <main
          role="alert"
          aria-live="assertive"
          className="p-6 text-red-700 bg-red-100 rounded max-w-xl mx-auto mt-10"
        >
          <header>
            <h2 className="text-2xl font-bold mb-2">An error occurred</h2>
          </header>
          <p>{errorMessage}</p>
        </main>
      );
    }

    return this.props.children;
  }
}
