import { useEffect, useState } from 'react';
import axios from 'axios';
import ConversationCard from './ConversationCard';
import { Conversation } from '../../models/models';

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/conversations')
      .then((response) => {
        setConversations(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

return (
    <>
        {conversations.map((conversation) => {
            return <ConversationCard conversation={conversation} />; // Pass the conversation prop correctly
        })}
    </>
);
}
