import React, { useCallback, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Chat from './Chat';
import SideList from './SideList';
import { useHideLoading, useIsLoading, useShowLoading } from '../../store/hooks/loadingHooks';
import ChatTools from './ChatTools';
import { useParams } from 'react-router';
import history from '../../shared/history';
import { sendError, sendInfo } from '../../utils/notify';
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

  const handleFetch = useCallback(async () => {
    if (!socket) {
      showLoading();
      try {
        await getUser();
        await getSocket();
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
  }, [socket]);

  const handleSendMessage = (message: ChatMessage) => {
    if (socket && socket.connected) {
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
    if (socket && socket.connected) {
      socket.emit('Typing', data);
    } else {
      sendError('Falha ao conectar com o chat!');
      hideLoading();
      history.push('/');
    }
  };

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
        setConnectedUsers(userList);
      });
      socket.on('forceDisconnect', () => {
        sendInfo('Você foi desconectado do chat, houve uma nova conexão em outra aba!');
        history.push('/');
        socket.disconnect();
      });
    }
  }, [socket, user]);

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
            <Chat messages={messages} typingUsers={typingUsers} socketId={socket?.id ?? ''} />
          </div>
          <div style={{ height: '10%' }}>
            <ChatTools
              sendMessage={handleSendMessage}
              sendTyping={handleSendTyping}
              roomId={roomId}
              user={user}
              socketId={socket?.id ?? ''}
            />
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
