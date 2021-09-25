/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { requestService } from '../../utils/requestService';
import { config } from 'dotenv';
config();

export const requestRoomData = async (roomId: string) => {
  const url = `${process.env.REACT_APP_API_URL}/chat/room/${roomId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, 'GET');
  return response.content;
};

export const requestRoomsData = async () => {
  const url = `${process.env.REACT_APP_API_URL}/chat/rooms`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, 'GET');
  return response.content;
};
