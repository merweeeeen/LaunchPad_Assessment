import { Container } from '@mantine/core';
import { UUID } from 'crypto';
import MessageBox from './MessagesBox';
import ChatBox from './ChatBox';

const ChatRoom = ({ conversationId }: any) => {
  return (
    <>
      <MessageBox id={conversationId} />
      <ChatBox />
    </>
  );
};
export default ChatRoom;
