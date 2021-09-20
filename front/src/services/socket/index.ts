import { io, Socket } from 'socket.io-client';

export const requestSocket = (): Socket => {
  const socket = io('http://localhost:8080/');
  return socket;
};
