import React, { useCallback, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Chat from './Chat';
import SideList from './SideList';
import { useHideLoading, useIsLoading, useShowLoading } from '../../store/hooks/loadingHooks';
import ChatTools from './ChatTools';
import { useParams } from 'react-router';
import history from '../../shared/history';
import { sendError } from '../../utils/notify';
import { ChatMessage, ChatTyping, ChatUser } from '../../shared/@types/chat';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetSocket, useSocket } from '../../store/hooks/socketHooks';
import { useGetUser, useUser } from '../../store/hooks/userHooks';

interface ParamsType {
  roomId: string;
}

const chatPage = (): JSX.Element => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<ChatTyping[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<ChatUser[]>([]);
  const getUser = useGetUser();
  const user = useUser();
  const isLoading = useIsLoading();
  const getSocket = useGetSocket();
  const socket = useSocket();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const roomId = useParams<ParamsType>().roomId;

  const handleFetch = useCallback(() => {
    if (!socket && user) {
      showLoading();
      try {
        getSocket();
      } catch (error) {
        if (error instanceof Error) {
          sendError('Falha ao conectar com o chat!');
        }
        hideLoading();
        history.push('/');
      } finally {
        hideLoading();
      }
    }
  }, [user, socket]);

  const handleSendMessage = (message: ChatMessage) => {
    if (socket) {
      if (message.content !== '') {
        socket.emit('chatMessage', message);
      }
    } else {
      sendError('Falha ao conectar com o chat!');
      hideLoading();
      history.push('/');
    }
  };

  const handleSendTyping = (data: ChatTyping) => {
    if (socket) {
      socket.emit('Typing', data);
    } else {
      sendError('Falha ao conectar com o chat!');
      hideLoading();
      history.push('/');
    }
  };

  const handleGetUserData = useCallback(async () => {
    try {
      await getUser();
    } catch {
      sendError('Falha ao buscar dados da sessão, por favor realize o login novamente!');
      hideLoading();
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.emit('joinedChat', { roomId, user, socketId: socket.id });
      socket.on('broadcastMessage', (message) => {
        if (message.roomId === roomId) {
          const messageslist = messages;
          setMessages([]);
          messageslist.push(message);
          setMessages(messageslist);
        }
      });
      socket.on('broadcastTyping', (data: ChatTyping[]) => {
        const typingList: ChatTyping[] = [];
        setTypingUsers([]);
        data.map((item) => {
          if (item.roomId === roomId) {
            typingList.push(item);
          }
        });
        setTypingUsers(typingList);
      });
      socket.on('broadcastUserList', (data: ChatUser[]) => {
        const userList: ChatUser[] = [];
        setConnectedUsers([]);
        data.map((item) => {
          if (item.roomId === roomId) {
            userList.push(item);
          }
        });
        console.log(userList);
        setConnectedUsers(userList);
      });
    }
  }, [socket, user]);

  useEffect(() => {
    if (!user) {
      handleGetUserData();
    }
  }, [handleGetUserData, user]);

  useEffect(() => {
    if (!roomId) {
      sendError('Falha ao localizar o chat!');
      hideLoading();
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
            <Chat messages={messages} typingUsers={typingUsers} />
          </div>
          <div style={{ height: '10%' }}>
            <ChatTools sendMessage={handleSendMessage} sendTyping={handleSendTyping} roomId={roomId} user={user} />
          </div>
        </div>
        <div className="d-flex justify-content-center sideListBox" style={{ width: '100%' }}>
          <SideList users={connectedUsers} />
        </div>
      </div>
    </Col>
  );
};

export default chatPage;
