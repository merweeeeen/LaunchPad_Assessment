import { Card, Image, Text } from '@mantine/core';
import { Conversation } from '../../models/models';
import { useEffect } from 'react';

interface ConversationCard {
  conversation: Conversation;
}

const ConversationCard = ({ conversation }: ConversationCard) => {
  useEffect(() => {
    console.log(conversation.name);
  }, []);
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Text fw={500} size="lg" mt="md">
        {conversation.name}
      </Text>
    </Card>
  );
};

export default ConversationCard;
