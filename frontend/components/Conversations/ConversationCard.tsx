import { Card, Text, Group, Menu } from '@mantine/core';
import { Conversation } from '../../models/models';
import Link from 'next/link';
import { IconDotsVertical } from '@tabler/icons-react';
import { useState } from 'react';
import TitleModal from './ChangeTitleModal';
import DeleteButton from './DeleteButton';

interface ConversationCard {
  conversation: Conversation;
  setSubmitted?: (submit: boolean) => void;
}

const ConversationCard = ({ conversation, setSubmitted }: ConversationCard) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Card component="a" mt="sm" target="_blank">
        <Group justify="space-between">
          <Link
            href={`http://localhost:3001/${conversation.id}`}
            style={{ textDecoration: 'none', width: '80%' }}
          >
            <Text size="md" c="var(--mantine-color-white)">
              {conversation.name}
            </Text>
          </Link>
          <Menu>
            <Menu.Target>
              <IconDotsVertical />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                onClick={() => {
                  setModal(true);
                }}
              >
                Change Title
              </Menu.Item>
              <Menu.Item>
                <DeleteButton conversationId={conversation.id} setSubmitted={setSubmitted} />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card>
      <TitleModal
        modal={modal}
        setModal={setModal}
        conversationId={conversation.id}
        setSubmitted={setSubmitted}
      />
    </>
  );
};

export default ConversationCard;
