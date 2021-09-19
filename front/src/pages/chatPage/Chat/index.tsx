import React from 'react';
import { Col } from 'react-bootstrap';
import { ChatMessage } from '../../../shared/@types/chat';
import './styles.scss';

const Chat = () => (
  <Col className="m-2" style={{ height: '100%' }}>
    <Col style={{ overflowY: 'scroll', wordWrap: 'break-word', height: '97%' }}>
      <div className="message">
        <b>Gustavo:</b> Testando!
      </div>
    </Col>
    <Col style={{ maxWidth: '100%' }}>
      <div className="d-flex flex-nowrap" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
        <div className="typing">Gustavo está digitando...</div>
        <div className="typing">Pedro está digitando...</div>
        <div className="typing">Carlos está digitando...</div>
        <div className="typing">Carlos está digitando...</div>
        <div className="typing">Carlos está digitando...</div>
        <div className="typing">Carlos está digitando...</div>
        <div className="typing">Carlos está digitando...</div>
        <div className="typing">Carlos está digitando...</div>
        <div className="typing">Carlos está digitando...</div>
      </div>
    </Col>
  </Col>
);

export default Chat;
