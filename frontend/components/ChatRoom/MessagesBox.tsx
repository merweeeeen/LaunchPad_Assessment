import { useEffect, useState } from 'react';
import { Stack, Card, Text } from '@mantine/core';
import axios from 'axios';
import { ConversationFull } from '@/models/models';

const MessageBox = ({ id }: any) => {
  const [conversation, setConversation] = useState<any[]>();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/conversations/${id}`)
      .then((response) => {
        let sequenced_conversation = [];
        for (let message of response.data.messages) {
          if (message.content[0].role == 'user') {
            sequenced_conversation.push([message.content[0].content, message.content[1].content]);
          } else {
            sequenced_conversation.push([message.content[1].content, message.content[0].content]);
          }
        }
        setConversation(sequenced_conversation);
      })
      .catch((error): any => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <Stack h={300} bg="var(--mantine-color-body)" align="stretch" justify="center" gap="md">
        {conversation?.map((message) => {
          return (
            <>
              <Stack
                h={100}
                bg="var(--mantine-color-body)"
                align="flex-end"
                justify="flex-start"
                gap="md"
              >
                <Card bg="var(--mantine-color-blue-light)" style={{ width: '70%' }}>
                  <Text>{message[0]}</Text>
                </Card>
              </Stack>
              <Stack
                h={100}
                bg="var(--mantine-color-body)"
                align="flex-start"
                justify="flex-start"
                gap="md"
              >
                <Card bg="var(--mantine-color-green-light)" style={{ width: '70%' }}>
                  <Text>{message[1]}</Text>
                </Card>
              </Stack>
            </>
          );
        })}
      </Stack>
    </>
  );
};
export default MessageBox;
