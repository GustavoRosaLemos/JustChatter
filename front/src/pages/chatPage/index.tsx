import React, { useCallback, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client';
import Chat from './Chat';
import SideList from '../../shared/components/SideList';
import { useHideLoading, useIsLoading, useShowLoading } from '../../store/hooks/loadingHooks';
import ChatTools from './ChatTools';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useParams } from 'react-router';
import history from '../../shared/history';
import { sendError, sendSucess } from '../../utils/notify';
import { ChatMessage } from '../../shared/@types/chat';
import ClipLoader from 'react-spinners/ClipLoader';

interface ParamsType {
  roomId: string;
}

const chatPage = () => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap> | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'message',
      roomId: '614638c098158943e6d074f9',
      sender: 'Gustavo',
      content: 'teste',
      key: 'njdkawjndkwjadn',
    },
  ]);
  const isLoading = useIsLoading();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const roomId = useParams<ParamsType>().roomId;

  const handleConnect = useCallback(() => {
    if (socket) {
      if (roomId) {
        socket.emit('joinedChat', roomId);
        sendSucess('Conectado ao chat!');
        hideLoading();
      } else {
        sendError('Falha ao localizar o chat!');
        history.push('/');
      }
    } else {
      setSocket(io('http://localhost:8080/'));
    }
  }, [socket]);

  const handleReceiveMessages = useCallback(async () => {
    if (socket) {
      socket.on('refreshMessage', (message: ChatMessage) => {
        if (message.roomId == roomId) {
          const messagesReceived = messages;
          messagesReceived.push(message);
          setMessages(messagesReceived);
        }
        console.log('message received');
        console.log(messages);
      });
    }
  }, [socket]);

  const handleSendMessage = (message: ChatMessage) => {
    if (socket) {
      if (message.content !== '') {
        socket.emit('chatMessage', message);
      }
    } else {
      sendError('Falha ao conectar com o chat!');
      history.push('/');
    }
  };

  useEffect(() => {
    showLoading();
    if (!roomId) {
      sendError('Falha ao localizar o chat!');
      history.push('/');
    }
    handleConnect();
    handleReceiveMessages();
  }, [handleConnect, handleReceiveMessages]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '30vh' }}>
        <ClipLoader color="#0d6efd" loading={isLoading} size={100} speedMultiplier={0.5} />
      </div>
    );
  }

  return (
    <Col style={{ height: '92.5vh' }}>
      <div className="d-flex justify-content-between" style={{ height: '100%' }}>
        <div className="d-flex flex-column justify-content-between col-md-10" style={{ backgroundColor: '#F7F7F7' }}>
          <div style={{ height: '100%', maxHeight: '83vh' }}>
            <Chat messages={messages} />
          </div>
          <div style={{ height: '10%' }}>
            <ChatTools sendMessage={handleSendMessage} roomId={roomId} />
          </div>
        </div>
        <div className="d-flex justify-content-center sideListBox" style={{ width: '100%' }}>
          <SideList />
        </div>
      </div>
    </Col>
  );
};

export default chatPage;
