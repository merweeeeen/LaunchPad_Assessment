import { useEffect, useState } from 'react';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import ConversationCard from '@/components/Conversations/ConversationCard';
import { Conversation } from '../../models/models';
import { UUID } from 'crypto';
import MessageBox from '../ChatRoom/MessagesBox';

const BasicAppShell = ({ conversation }: any) => {
  const [opened, { toggle }] = useDisclosure();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<UUID>();
  useEffect(() => {
    axios
      .get('http://localhost:3000/conversations')
      .then((response): any => {
        setConversations(response.data);
        console.log(response.data);
      })
      .catch((error): any => {
        console.log(error);
      });
    console.log(conversation);
  }, []);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <h3>Interact with a ChatBot right now !</h3>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Conversations
        {conversations.map((conversation) => {
          return <ConversationCard conversation={conversation} setActive={setActiveConversation} />; // Pass the conversation prop correctly
        })}
      </AppShell.Navbar>
      <AppShell.Main>{!conversation ? <>Start a New Chat !</> : <MessageBox />}</AppShell.Main>
    </AppShell>
  );
};

export default BasicAppShell;
