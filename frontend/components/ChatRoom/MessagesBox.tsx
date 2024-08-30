import { useEffect, useState } from 'react';
import { Stack, Card, Text, ScrollArea } from '@mantine/core';
import axios from 'axios';

const MessageBox = ({ id, setSubmitted, submitted }: any) => {
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

  useEffect(() => {
    if (submitted) {
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
          setSubmitted(false);
        })
        .catch((error): any => {
          console.log(error);
        });
    }
  }, [submitted]);

  return (
    <ScrollArea h={680}>
      {id !== '' ? (
        <Stack bg="var(--mantine-color-body)" align="stretch" justify="center" gap="md" mt={'lg'}>
          {conversation?.map((message) => {
            return (
              <>
                <Stack
                  bg="var(--mantine-color-body)"
                  align="flex-end"
                  justify="flex-start"
                  gap="md"
                >
                  <Card
                    bg="var(--mantine-color-white)"
                    style={{ width: 'fit-content', maxWidth: '70%' }}
                    c="var(--mantine-color-black)"
                  >
                    <Text>{message[0]}</Text>
                  </Card>
                </Stack>
                <Stack
                  bg="var(--mantine-color-body)"
                  align="flex-start"
                  justify="flex-start"
                  gap="md"
                >
                  <Card
                    bg="var(--mantine-color-black)"
                    style={{ width: 'fit-content', maxWidth: '70%' }}
                  >
                    <Text>{message[1]}</Text>
                  </Card>
                </Stack>
              </>
            );
          })}
        </Stack>
      ) : (
        <></>
      )}
    </ScrollArea>
  );
};
export default MessageBox;
