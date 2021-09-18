/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { requestService } from '../../utils/requestService';

export const requestRoomData = async (roomId: string) => {
  const url = `http://localhost:8080/api/v1/justchatter/chat/room/${roomId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, 'GET');
  return response;
};

export const requestRoomsData = async () => {
  const url = `http://localhost:8080/api/v1/justchatter/chat/rooms`;
  console.log(url);
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, 'GET');
  console.log(response);
  return response;
};
