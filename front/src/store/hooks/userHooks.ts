import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionParam, getTokenData } from '../../utils';
import * as userActions from '../user/userAction';
import { RootState } from '../reducers';
import { User } from '../../shared/@types/user';

const useUserState = () => useSelector((rootState: RootState) => rootState.userState);

export const useUser = (): User | undefined => useUserState().user;

export const useGetUser = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    const token = getSessionParam('token');
    if (token) {
      const user = getTokenData(token).user;
      dispatch(userActions.getUser(user));
    }
  }, [dispatch]);
};
