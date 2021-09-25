import { io, Socket } from 'socket.io-client';
import { config } from 'dotenv';
config();

export const requestSocket = (): Socket => {
  const socket = io(process.env.REACT_APP_SOCKET_URL ?? 'http://localhost:8080');
  return socket;
};
