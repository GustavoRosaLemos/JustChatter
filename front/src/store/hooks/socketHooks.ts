import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { requestSocket } from '../../services/socket';
import { RootState } from '../reducers';
import * as socketActions from '../socket/socketAction';

const useSocketState = () => useSelector((rootState: RootState) => rootState.socketState);

export const useSocket = (): Socket | undefined => useSocketState().socket;

export const useGetSocket = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    const result = requestSocket();
    dispatch(socketActions.getSocket(result));
  }, [dispatch]);
};
