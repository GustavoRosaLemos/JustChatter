export interface ChatMessage {
  type: string;
  roomId: string;
  sender: string;
  content: string;
  key: string;
}
