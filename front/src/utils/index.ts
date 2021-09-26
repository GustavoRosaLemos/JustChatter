import jwt_decode from 'jwt-decode';
import { config } from 'dotenv';
import { UserToken } from '../shared/@types/user';
config();

export const getSessionParam = (param: string): string | null => localStorage.getItem(param);

export const saveSessionParam = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const clearSessionParams = (): void => {
  localStorage.clear();
};

export const getTokenData = (token: string): UserToken => {
  const decoded: UserToken = jwt_decode(token);
  return decoded;
};
