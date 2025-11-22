import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from '../error-boundary';
import './remote-wrapper.css';

export interface RemoteWrapperProps {
  children: React.ReactNode;
  moduleName: string;
  showIndicator?: boolean;
  fallback?: React.ReactNode;
}

/**
 * Wrapper component for remote modules that provides:
 * - Visual indicator that component is loaded from remote
 * - Error boundary for graceful error handling
 * - Suspense for loading states
 * - Developer-friendly debugging information
 */
export const RemoteWrapper: React.FC<RemoteWrapperProps> = ({
  children,
  moduleName,
  showIndicator = true,
  fallback,
}) => {
  const [showDebug, setShowDebug] = useState(false);

  const defaultFallback = (
    <div
      style={{
        padding: '3rem',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
      }}
    >
      <div className="loading-spinner" />
      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
        Loading {moduleName} module...
      </p>
      <p style={{ margin: '0.5rem 0 0 0', color: '#999', fontSize: '0.75rem' }}>
        Fetching from remote microfrontend
      </p>
    </div>
  );

  return (
    <div className="remote-wrapper" style={{ position: 'relative' }}>
      {showIndicator && (
        <div
          className="remote-indicator"
          onClick={() => setShowDebug(!showDebug)}
          title="Click to toggle debug info - This component is loaded from a remote microfrontend"
        >
          <span className="remote-indicator-dot" />
          Remote
        </div>
      )}

      {showDebug && (
        <div className="debug-panel">
          <div className="debug-panel-title">Module Federation Debug</div>
          <div className="debug-panel-label">Module:</div>
          <div className="debug-panel-value">{moduleName}</div>
          <div className="debug-panel-label">Source:</div>
          <div className="debug-panel-value debug-panel-source">
            remote@http://localhost:3051
          </div>
        </div>
      )}

      <ErrorBoundary
        fallback={
          <div
            style={{
              padding: '2rem',
              border: '2px solid #dc3545',
              borderRadius: '8px',
              backgroundColor: '#fff5f5',
              animation: 'fadeIn 0.3s ease-in',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#dc3545',
                }}
              />
              <h3 style={{ margin: 0, color: '#dc3545', fontSize: '1rem' }}>
                Failed to load remote module
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>
              The <strong>{moduleName}</strong> module could not be loaded. This usually means the remote
              application is not running or the manifest file cannot be accessed.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fff', borderRadius: '4px', fontSize: '0.8rem', color: '#666' }}>
              <strong>Debug steps:</strong>
              <ol style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                <li>Start the remote app: <code style={{ fontSize: '0.75rem', backgroundColor: '#f0f0f0', padding: '0.15rem 0.3rem', borderRadius: '3px' }}>cd microfrontends-remote && pnpm dev</code></li>
                <li>Verify the manifest is accessible: <a href="http://localhost:3051/static/mf-manifest.json" target="_blank" rel="noopener noreferrer" style={{ color: '#4ecaff', textDecoration: 'underline' }}>http://localhost:3051/static/mf-manifest.json</a></li>
                <li>Check browser console (F12) for detailed error messages</li>
                <li>Verify CORS is enabled on the remote server</li>
              </ol>
            </div>
          </div>
        }
      >
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

