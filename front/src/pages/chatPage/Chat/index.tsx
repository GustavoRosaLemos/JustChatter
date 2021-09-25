import React from 'react';
import { Col } from 'react-bootstrap';
import { ChatMessage, ChatTyping } from '../../../shared/@types/chat';
import './styles.scss';

interface ChatProps {
  messages: ChatMessage[];
  typingUsers: ChatTyping[];
  socketId: string;
}

const Chat = ({ messages, typingUsers, socketId }: ChatProps): JSX.Element => {
  return (
    <Col className="m-2" style={{ height: '100%' }}>
      <Col style={{ overflowY: 'scroll', wordWrap: 'break-word', height: '97%' }}>
        {messages &&
          messages.map((message) =>
            message.type === 'message' ? (
              <div className={socketId === message.socketId ? 'selfMessage' : 'message'} key={message.key}>
                {`${message.sender}: ${message.content}`}
              </div>
            ) : (
              <div className="broadcast" key={message.key}>
                {message.content}
              </div>
            ),
          )}
      </Col>
      <Col style={{ maxWidth: '100%' }}>
        <div className="d-flex flex-nowrap" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          {typingUsers &&
            typingUsers.map((typing) => (
              <div className="typing" key={typing.key}>
                {typing.username} está digitando...
              </div>
            ))}
        </div>
      </Col>
    </Col>
  );
};

export default Chat;
