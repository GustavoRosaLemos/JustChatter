import { Socket } from 'socket.io-client';
import * as socketActions from '../socket/socketAction';

export interface State {
  socket?: Socket;
}

const INITIAL_STATE: State = {
  socket: undefined,
};

export type Actions = socketActions.GetSocket;

export const socketReducer = (state = INITIAL_STATE, action: Actions): State => {
  switch (action.type) {
    case socketActions.GET_SOCKET: {
      const { socket } = action.payload;
      return { ...state, socket };
    }
    default:
      return state;
  }
};
