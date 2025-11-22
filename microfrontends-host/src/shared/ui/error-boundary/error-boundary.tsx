import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: '2rem',
              border: '2px solid #dc3545',
              borderRadius: '8px',
              backgroundColor: '#fff5f5',
              color: '#dc3545',
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0' }}>⚠️ Failed to load remote module</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              {this.state.error?.message || 'An error occurred while loading this component.'}
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

