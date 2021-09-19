import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import * as loadingAction from '../loading/loadingAction';

const useLoadingState = () => useSelector((rootState: RootState) => rootState.loadingState);

export const useIsLoading = (): boolean => useLoadingState().isLoading;

export const useShowLoading = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(loadingAction.showLoading());
  }, [dispatch]);
};

export const useHideLoading = (): (() => void) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(loadingAction.hideLoading());
  }, [dispatch]);
};
