import { useState } from 'react';
import MessageBox from './MessagesBox';
import ChatBox from './ChatBox';

const ChatRoom = ({ conversationId }: any) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  return (
    <>
      <MessageBox id={conversationId} setSubmitted={setSubmitted} submitted={submitted} />
      <ChatBox id={conversationId} setSubmitted={setSubmitted} />
    </>
  );
};
export default ChatRoom;
