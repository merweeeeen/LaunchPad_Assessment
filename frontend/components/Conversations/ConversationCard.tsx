import { Card, Button, Text, Group } from '@mantine/core';
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
    <Card padding="md" bg="var(--mantine-color-white)"  radius="md" style={{ width: "35%" }}>
      <Group justify="space-between" >
        <Text fw={500} size="lg" c="var(--mantine-color-black)">
          {conversation.name}
        </Text>
        <Button variant="filled" size="sm" autoContrast >
          See Conversation
        </Button>
      </Group>
    </Card>
  );
};

export default ConversationCard;
