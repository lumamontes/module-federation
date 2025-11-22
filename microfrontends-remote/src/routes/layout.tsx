import { Outlet } from '@modern-js/runtime/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Layout component for the remote app
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
  return (
    <QueryClientProvider client={queryClient}>
        <Outlet />
    </QueryClientProvider>
  );
}
