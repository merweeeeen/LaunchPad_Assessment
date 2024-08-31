import { useState } from 'react';
import { AppShell, Burger, Group, Button, ScrollArea, Dialog } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import ConversationCard from '@/components/Conversations/ConversationCard';
import { Conversation } from '../../models/models';
import ChatRoom from '../ChatRoom/ChatRoom';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

const BasicAppShell = ({ conversationId }: any) => {
  const [errorActive, setError] = useState(false);
  const [opened, { toggle }] = useDisclosure();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['fetchConvo', submitted],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:3000/conversations`);
        return response.data;
      } catch (error) {
        setError(true);
        console.log(error);
      }
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
          {data &&
            data.map((conversation: any) => {
              return (
                <ConversationCard
                  conversation={conversation}
                  setSubmitted={setSubmitted}
                  setError={setError}
                />
              ); // Pass the conversation prop correctly
            })}
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main>
        <ChatRoom
          conversationId={conversationId}
          setSubmitted={setSubmitted}
          submitted={submitted}
          setError={setError}
        />
      </AppShell.Main>
      <Dialog opened={errorActive} position={{ top: 20, left: '40%' }} bg="red">
        Error: Please Refresh Page
      </Dialog>
    </AppShell>
  );
};

export default BasicAppShell;
