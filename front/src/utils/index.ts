import jwt_decode from 'jwt-decode';
import { config } from 'dotenv';
import { User, UserToken } from '../shared/@types/user';
config();

export const getSessionParam = (param: string): string | null => sessionStorage.getItem(param);

export const saveSessionParam = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const clearSessionParams = (): void => {
  sessionStorage.clear();
};

export const getTokenData = (token: string): UserToken => {
  const decoded: UserToken = jwt_decode(token);
  return decoded;
};
