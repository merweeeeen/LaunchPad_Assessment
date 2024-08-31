import { Button, TextInput, Group } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { getHotkeyHandler } from '@mantine/hooks';

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

  const onEnter = async (e: any) => {
    if (query !== '') {
      await onSubmit(e);
    }
  };

  return (
    <Group m="md" justify="center">
      <TextInput
        placeholder="Enter your name"
        w="80%"
        size="lg"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyDown={getHotkeyHandler([['Enter', onEnter]])}
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
        Send
      </Button>
    </Group>
  );
};

export default ChatBox;
