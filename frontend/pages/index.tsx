import BasicAppShell from '@/components/AppShell/AppShell';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()
export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BasicAppShell conversationId="" />
    </QueryClientProvider>
  );
}
