import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestRoomData, requestRoomsData } from '../../services/room';
import { Room } from '../../shared/@types/room';
import { RootState } from '../reducers';
import * as roomAction from '../room/roomAction';

const useRoomState = () => useSelector((rooState: RootState) => rooState.roomState);

export const useRoom = (): Room | undefined => useRoomState().room;

export const useGetRoom = (): ((roomId: string) => Promise<void>) => {
  const dispatch = useDispatch();

  return useCallback(
    async (roomId: string) => {
      const result = await requestRoomData(roomId);
      dispatch(roomAction.getRoom(result));
    },
    [dispatch],
  );
};

export const useRooms = (): Room[] | undefined => useRoomState().rooms;

export const useGetRooms = (): (() => Promise<void>) => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const result = await requestRoomsData();
    dispatch(roomAction.getRooms(result));
  }, [dispatch]);
};
