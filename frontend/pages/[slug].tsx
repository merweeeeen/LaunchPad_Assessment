import { Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import BasicAppShell from '@/components/AppShell/AppShell';

// Existing Chat
const Conversation = () => {
  const router = useRouter();
  return (
    <Stack>
      <BasicAppShell conversationId={router.query.slug}/>
    </Stack>
  );
};

export default Conversation;
