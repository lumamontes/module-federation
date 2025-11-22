import { Outlet, Link, useLocation } from '@modern-js/runtime/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './layout.css';

/**
 * Create a QueryClient instance with default options
 * This is shared across all remote modules loaded in the host
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Dashboard', isRemote: false },
    { path: '/analytics', label: 'NEO Analytics', isRemote: true },
    { path: '/users', label: 'Mission Personnel', isRemote: true },
    { path: '/notifications', label: 'Mission Alerts', isRemote: true },
    { path: '/settings', label: 'API Settings', isRemote: true },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* Sidebar Navigation */}
        <aside
          style={{
          width: '250px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          padding: '2rem 0',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
            Admin Panel
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#999' }}>
            Microfrontend Architecture
          </p>
        </div>

        <nav>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.5rem',
                  color: isActive ? '#4ecaff' : '#ccc',
                  backgroundColor: isActive ? 'rgba(78, 202, 255, 0.1)' : 'transparent',
                  textDecoration: 'none',
                  borderLeft: isActive ? '3px solid #4ecaff' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '400' }}>
                  {item.label}
                </span>
                {item.isRemote && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.4rem',
                      backgroundColor: 'rgba(78, 202, 255, 0.2)',
                      color: '#4ecaff',
                      borderRadius: '3px',
                      fontFamily: 'monospace',
                      fontWeight: '600',
                    }}
                    title="Loaded from remote microfrontend"
                  >
                    MF
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: 'auto',
            padding: '1.5rem',
            borderTop: '1px solid #333'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>
            Built with Module Federation
          </p>
        </div>
      </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
