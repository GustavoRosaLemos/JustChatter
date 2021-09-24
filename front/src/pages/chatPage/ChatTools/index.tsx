import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { ChatMessage, ChatTyping } from '../../../shared/@types/chat';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../shared/@types/user';

interface ChatToolsProps {
  sendMessage: (msg: ChatMessage) => void;
  sendTyping: (data: ChatTyping) => void;
  roomId: string;
  user?: User;
}

const ChatTools = ({ sendMessage, sendTyping, roomId, user }: ChatToolsProps): JSX.Element => {
  const [content, setContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleResetChatInput = () => {
    setContent('');
    sendTyping({ roomId: roomId, type: 'stop', username: user?.username ?? '', key: user?._id ?? uuidv4() });
    setIsTyping(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('chatSubmit')?.click();
      }
    });
  }, []);

  useEffect(() => {
    if (content !== '' && !isTyping) {
      sendTyping({ roomId: roomId, type: 'start', username: user?.username ?? '', key: user?._id ?? uuidv4() });
      setIsTyping(true);
      setTimeout(() => {
        if (isTyping) {
          sendTyping({ roomId: roomId, type: 'stop', username: user?.username ?? '', key: user?._id ?? uuidv4() });
          setIsTyping(false);
        }
      }, 10000);
    } else if (content === '' && isTyping) {
      sendTyping({ roomId: roomId, type: 'stop', username: user?.username ?? '', key: user?._id ?? uuidv4() });
      setIsTyping(false);
    }
  }, [content]);

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
          id="chatSubmit"
          className="btn btn-primary"
          style={{ height: '50px' }}
          onClick={() => {
            sendMessage({
              type: 'message',
              roomId: roomId,
              sender: user?.username ?? 'Desconhecido',
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
