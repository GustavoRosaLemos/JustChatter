import { User } from '../../shared/@types/user';
import * as userActions from '../user/userAction';

export interface State {
  user?: User;
}

const INITIAL_STATE: State = {
  user: undefined,
};

export type Actions = userActions.GetUser;

export const userReducer = (state = INITIAL_STATE, action: Actions): State => {
  switch (action.type) {
    case userActions.GET_USER: {
      const { user } = action.payload;
      return { ...state, user };
    }
    default:
      return state;
  }
};
