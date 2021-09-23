import { User } from '../../shared/@types/user';

export const GET_USER = 'GET_USER';

export const getUser = (user: User): GetUser => ({
  type: GET_USER,
  payload: {
    user,
  },
});

export interface GetUser {
  type: typeof GET_USER;
  payload: {
    user: User;
  };
}
