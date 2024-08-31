import { Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import BasicAppShell from '@/components/AppShell/AppShell';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Existing Chat
const Conversation = () => {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <BasicAppShell conversationId={router.query.slug} />
      </Stack>
    </QueryClientProvider>
  );
};

export default Conversation;
