import { User } from './user';

export interface ChatMessage {
  type: string;
  roomId: string;
  sender: string;
  content: string;
  key: string;
}

export interface ChatTyping {
  type: string;
  roomId: string;
  username: string;
  key: string;
}

export interface ChatUser {
  roomId: string;
  sid: string;
  socketId: string;
  user: User;
}
