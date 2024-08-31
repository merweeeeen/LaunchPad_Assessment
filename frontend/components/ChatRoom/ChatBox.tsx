import { Button, TextInput, Group } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

const ChatBox = ({ id, setSubmitted }: any) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  async function send_request() {
    if (query !== '') {
      setLoading(true);
      if (id !== '') {
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
      } else {
        axios
          .post('http://localhost:3000/conversations', {
            query: query,
          })
          .then((response) => {
            console.log(response);
            setSubmitted(true);
            setLoading(false);
            router.push(
              {
                pathname: `/${response.data._id}`,
              },
              undefined,
              { shallow: true }
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
  return (
    <Group m="md" justify='center'>
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
        bg={'var(--mantine-color-white)'}
        c={'black'}
      >
        Validate
      </Button>
    </Group>
  );
};

export default ChatBox;
