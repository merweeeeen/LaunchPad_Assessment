import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

const DeleteButton = ({ conversationId, setSubmitted }: any) => {
  const router = useRouter();
  const setChanges = async () => {
    await axios.delete(`http://localhost:3000/conversations/${conversationId}`);

    router.push(
      {
        pathname: `/`,
      },
      undefined,
      { shallow: true }
    );
  };

  const mutation = useMutation({
    mutationFn: () => {
      return setChanges();
    },
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    mutation.mutate();
  };
  return (
    <Button
      bg="red"
      onClick={async (e) => {
        await onSubmit(e);
        setSubmitted(true);
      }}
    >
      Delete Conversation
    </Button>
  );
};

export default DeleteButton;
