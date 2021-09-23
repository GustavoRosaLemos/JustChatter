import React, { useCallback, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Chat from './Chat';
import SideList from '../../shared/components/SideList';
import { useHideLoading, useIsLoading, useShowLoading } from '../../store/hooks/loadingHooks';
import ChatTools from './ChatTools';
import { useParams } from 'react-router';
import history from '../../shared/history';
import { sendError, sendSucess } from '../../utils/notify';
import { ChatMessage } from '../../shared/@types/chat';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetSocket, useSocket } from '../../store/hooks/socketHooks';
import { useGetUser, useUser } from '../../store/hooks/userHooks';

interface ParamsType {
  roomId: string;
}

const chatPage = (): JSX.Element => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const getUser = useGetUser();
  const user = useUser();
  const isLoading = useIsLoading();
  const getSocket = useGetSocket();
  const socket = useSocket();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const roomId = useParams<ParamsType>().roomId;

  const handleFetch = useCallback(() => {
    if (!socket) {
      try {
        getSocket();
      } catch (error) {
        if (error instanceof Error) {
          sendError('Falha ao conectar com o chat!');
        }
        history.push('/');
      } finally {
        sendSucess('Chat conectado!');
        hideLoading();
      }
    }
  }, []);

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

  const handleGetUserData = useCallback(async () => {
    try {
      await getUser();
    } catch {
      sendError('Falha ao buscar dados da sessão, por favor realize o login novamente!');
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    if (!user) {
      handleGetUserData();
    }
    if (socket) {
      socket.on('broadcastMessage', (message) => {
        if (message.roomId === roomId) {
          const messagestemp = messages;
          setMessages([]);
          messagestemp.push(message);
          setMessages(messagestemp);
        }
      });
    }
  }, [socket, user]);

  useEffect(() => {
    showLoading();
    if (!roomId) {
      sendError('Falha ao localizar o chat!');
      history.push('/');
    }
    handleFetch();
  }, [handleFetch]);

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
            <ChatTools sendMessage={handleSendMessage} roomId={roomId} user={user} />
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
