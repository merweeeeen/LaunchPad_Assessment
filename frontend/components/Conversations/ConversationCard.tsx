import { Card, Button, Text, Group } from '@mantine/core';
import { Conversation } from '../../models/models';
import { useEffect } from 'react';
import Link from 'next/link';
import { UUID } from 'crypto';

interface ConversationCard {
  conversation: Conversation;
}

const ConversationCard = ({ conversation }: ConversationCard) => {
  return (
    <Link href={`http://localhost:3001/${conversation.id}`} style={{ textDecoration: 'none' }}>
      <Card component="a" mt="sm" target="_blank">
        <Text size="md" c="var(--mantine-color-white)">
          {conversation.name}
        </Text>
      </Card>
    </Link>
  );
};

export default ConversationCard;
