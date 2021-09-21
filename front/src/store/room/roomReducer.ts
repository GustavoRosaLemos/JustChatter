import { Room } from '../../shared/@types/room';
import * as roomActions from '../room/roomAction';

export interface State {
  room?: Room;
  rooms?: Room[];
}

const INITIAL_STATE: State = {
  room: undefined,
  rooms: undefined,
};

export type Actions = roomActions.GetRoom | roomActions.GetRooms;

export const roomReducer = (state = INITIAL_STATE, action: Actions): State => {
  switch (action.type) {
    case roomActions.GET_ROOM: {
      const { room } = action.payload;
      return {
        ...state,
        room,
      };
    }
    case roomActions.GET_ROOMS: {
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
