import { UUID } from 'crypto';

export interface DescriptionParams {
  id: UUID;
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
}

export interface Description {
  description?: DescriptionParams[];
}

export interface Conversation {
  id: UUID;
  name: string;
  params: Description;
  tokens: number;
}

type Role = 'assistant' | 'user' | 'system' | 'function';

export interface Prompt {
  role: Role;
  content: string;
}

export interface Messages {
  query_id: UUID;
  content: Prompt[];
}

export interface ConversationFull {
  messages?: Messages[];
}
