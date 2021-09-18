import { Room } from '../../shared/@types/room';

export const GET_ROOM = 'GET_ROOM';
export const GET_ROOMS = 'GET_ROOMS';

export const getRoom = (room: Room): GetRoom => ({
  type: GET_ROOM,
  payload: {
    room,
  },
});

export interface GetRoom {
  type: typeof GET_ROOM;
  payload: { room: Room };
}

export const getRooms = (rooms: Room[]): GetRooms => ({
  type: GET_ROOMS,
  payload: {
    rooms,
  },
});

export interface GetRooms {
  type: typeof GET_ROOMS;
  payload: { rooms: Room[] };
}
