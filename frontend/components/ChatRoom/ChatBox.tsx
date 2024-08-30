import { Button, TextInput, Group } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';

const ChatBox = ({ id, setSubmitted }: any) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  async function send_request() {
    if (query !== '') {
      setLoading(true);
      axios
        .post('http://localhost:3000/conversations', {
          query: query,
          id: id,
        })
        .then((response) => {
          setSubmitted(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <Group m="md">
      <TextInput
        placeholder="Enter your name"
        w="80%"
        size="lg"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Button
        size="lg"
        onClick={async () => {
          setQuery('');
          await send_request();
        }}
        loading={loading}
      >
        Validate
      </Button>
    </Group>
  );
};

export default ChatBox;
