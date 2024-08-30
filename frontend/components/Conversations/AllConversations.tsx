import { useEffect, useState } from 'react';
import axios from 'axios';
import ConversationCard from './ConversationCard';
import { Conversation } from '../../models/models';
import { Stack, Text, Button } from '@mantine/core';

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/conversations')
      .then((response) => {
        setConversations(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Stack align="center" gap="lg" justify="flex-start" mt="md">
      <Text size="xl">View your conversations</Text>
      <Button >New Chat</Button>
      {conversations.map((conversation) => {
        return <ConversationCard conversation={conversation} />; // Pass the conversation prop correctly
      })}
    </Stack>
  );
}
