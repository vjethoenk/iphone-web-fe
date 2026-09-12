import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Something went wrong</h2>
          <p className="text-sm text-neutral-500 max-w-md mt-2 mb-6">
            {this.state.error?.message || "An unexpected error occurred while rendering this section."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            aria-label="Try reloading section"
            className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
