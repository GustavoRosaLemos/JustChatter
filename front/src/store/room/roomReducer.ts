import { Room } from '../../shared/@types/room';
import * as roomAction from '../room/roomAction';

export interface State {
  room?: Room;
  rooms?: Room[];
}

const INITIAL_STATE: State = {
  room: undefined,
  rooms: undefined,
};

export type Actions = roomAction.GetRoom | roomAction.GetRooms;

export const roomReducer = (state = INITIAL_STATE, action: Actions): State => {
  switch (action.type) {
    case roomAction.GET_ROOM: {
      const { room } = action.payload;
      return {
        ...state,
        room,
      };
    }
    case roomAction.GET_ROOMS: {
      const { rooms } = action.payload;
      return {
        ...state,
        rooms,
      };
    }
    default:
      return state;
  }
};
