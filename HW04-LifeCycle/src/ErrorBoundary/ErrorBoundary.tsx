import React, { ErrorInfo } from "react";

interface StateErrorBoundary {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface PropsErrorBoundary {
  children: unknown;
}

export default class ErrorBoundary extends React.Component<
  PropsErrorBoundary,
  StateErrorBoundary
> {
  constructor(props: PropsErrorBoundary | Readonly<PropsErrorBoundary>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    if (this.state.errorInfo) {
      return (
        // Error path
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
