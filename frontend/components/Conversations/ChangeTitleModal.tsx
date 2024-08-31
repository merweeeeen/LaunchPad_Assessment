import { Modal, TextInput, Button, Stack } from '@mantine/core';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const TitleModal = ({ conversationId, modal, setModal, setSubmitted }: any) => {
  const [title, setTitle] = useState('');
  const setChanges = async (changes: { title: string }) => {
    await axios.put(`http://localhost:3000/conversations/${conversationId}`, {
      name: changes.title,
      params: null,
    });
  };

  const mutation = useMutation({
    mutationFn: (changes: { title: string }) => {
      return setChanges(changes);
    },
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    mutation.mutate({ title: title });
  };
  return (
    <>
      <Modal opened={modal} onClose={() => setModal(false)} title="Settings">
        <Stack>
          <TextInput
            label="Change Title"
            description="Change the Title of the Conversation"
            placeholder="Insert Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Button
            onClick={(e) => {
              onSubmit(e);
              setModal(false);
              setSubmitted(true);
            }}
          >
            Confirm
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default TitleModal;
