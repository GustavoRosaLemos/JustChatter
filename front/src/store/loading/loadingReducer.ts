import * as loadingActions from '../loading/loadingAction';

export interface State {
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  isLoading: false,
};

export type Actions = loadingActions.ShowLoading | loadingActions.HideLoading;

export const loadingReducer = (state = INITIAL_STATE, action: Actions): State => {
  switch (action.type) {
    case loadingActions.SHOW_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case loadingActions.HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
