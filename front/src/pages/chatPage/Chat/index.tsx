import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { ChatMessage } from '../../../shared/@types/chat';
import './styles.scss';

interface ChatProps {
  messages: ChatMessage[];
}

const Chat = ({ messages }: ChatProps): JSX.Element => {
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <Col className="m-2" style={{ height: '100%' }}>
      <Col style={{ overflowY: 'scroll', wordWrap: 'break-word', height: '97%' }}>
        {messages &&
          messages.map((message) => (
            <div className="message" key={message.key}>
              <b>{message.sender}:</b> {message.content}
            </div>
          ))}
      </Col>
      <Col style={{ maxWidth: '100%' }}>
        <div className="d-flex flex-nowrap" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <div className="typing">Gustavo está digitando...</div>
        </div>
      </Col>
    </Col>
  );
};

export default Chat;
