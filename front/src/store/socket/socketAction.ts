import { Socket } from 'socket.io-client';

export const GET_SOCKET = 'GET_SOCKET';

export const getSocket = (socket: Socket): GetSocket => ({
  type: GET_SOCKET,
  payload: {
    socket,
  },
});

export interface GetSocket {
  type: typeof GET_SOCKET;
  payload: {
    socket: Socket;
  };
}
