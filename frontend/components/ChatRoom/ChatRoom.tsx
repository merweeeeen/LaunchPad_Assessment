import MessageBox from './MessagesBox';
import ChatBox from './ChatBox';

const ChatRoom = ({ conversationId, setSubmitted, submitted, setError }: any) => {
  return (
    <>
      <MessageBox
        id={conversationId}
        setSubmitted={setSubmitted}
        submitted={submitted}
        setError={setError}
      />
      <ChatBox id={conversationId} setSubmitted={setSubmitted} setError={setError} />
    </>
  );
};
export default ChatRoom;
