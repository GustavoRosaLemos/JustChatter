import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { ChatMessage } from '../../../shared/@types/chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatToolsProps {
  sendMessage: (msg: ChatMessage) => void;
  roomId: string;
}

const ChatTools = ({ sendMessage, roomId }: ChatToolsProps) => {
  const [content, setContent] = useState('');

  const handleResetChatInput = () => {
    setContent('');
  };

  return (
    <div className="m-2">
      <InputGroup>
        <FormControl
          id="chatInput"
          placeholder="Escreva..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          className="btn btn-primary"
          style={{ height: '50px' }}
          onClick={() => {
            sendMessage({
              type: 'message',
              roomId: roomId,
              sender: 'Gustavo',
              content: content,
              key: uuidv4(),
            });
            handleResetChatInput();
          }}
        >
          Enviar
        </Button>
      </InputGroup>
    </div>
  );
};

export default ChatTools;
