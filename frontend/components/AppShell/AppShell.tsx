import { useEffect, useState } from 'react';
import { AppShell, Burger, Group, Button, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import ConversationCard from '@/components/Conversations/ConversationCard';
import { Conversation } from '../../models/models';
import { UUID } from 'crypto';
import ChatRoom from '../ChatRoom/ChatRoom';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

const BasicAppShell = ({ conversationId }: any) => {
  const [opened, { toggle }] = useDisclosure();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['fetchConvo', submitted],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/conversations`);

      return response.data;
    },
  });
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h3 style={{ color: 'white' }}>LaunchPadBot</h3>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Group justify="space-between" mb="xs">
          Conversations
          <Link href="http://localhost:3001">
            <Button bg={'var(--mantine-color-white)'} c={'black'}>
              New
            </Button>
          </Link>
        </Group>
        <ScrollArea>
          {data && data.map((conversation: any) => {
            return <ConversationCard conversation={conversation} />; // Pass the conversation prop correctly
          })}
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <ChatRoom
          conversationId={conversationId}
          setSubmitted={setSubmitted}
          submitted={submitted}
        />
      </AppShell.Main>
    </AppShell>
  );
};

export default BasicAppShell;
