import { Button, TextInput, Group } from '@mantine/core';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { ConversationFull } from '@/models/models';

const ChatBox = ({ id, setSubmitted }: any) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const createConversation = async (query: { query: string }) => {
    if (id !== '') {
      const { data: response } = await axios.post('http://localhost:3000/conversations', {
        query: query.query,
        id: id,
      });
      setLoading(false);
      setSubmitted(true);
      return response;
    }
    const { data: response } = await axios.post('http://localhost:3000/conversations', {
      query: query.query,
    });
    router.push(
      {
        pathname: `/${response._id}`,
      },
      undefined,
      { shallow: true }
    );
    setLoading(false);
    setSubmitted(true);
    return response;
  };

  const mutation = useMutation({
    mutationFn: (query: { query: string }) => {
      return createConversation(query);
    },
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    mutation.mutate({ query: query });
  };

  return (
    <Group m="md" justify="center">
      <TextInput
        placeholder="Enter your name"
        w="80%"
        size="lg"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Button
        size="lg"
        onClick={async (e) => {
          setQuery('');
          setLoading(true);
          await onSubmit(e);
        }}
        loading={loading}
        bg={'var(--mantine-color-white)'}
        c={'black'}
      >
        Validate
      </Button>
    </Group>
  );
};

export default ChatBox;
