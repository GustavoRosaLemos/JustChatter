import { requestService } from '../../utils/requestService';
import { LoginData, RegisterData, LoginResponse, RegisterResponse } from '../../shared/@types/login';
import { config } from 'dotenv';
config();

export const requestLogin = async (login: LoginData): Promise<LoginResponse> => {
  const url = `${process.env.REACT_APP_API_URL}/auth/login`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, login, headers, 'POST');
  return response.content;
};

export const requestRegister = async (register: RegisterData): Promise<RegisterResponse> => {
  const url = `${process.env.REACT_APP_API_URL}/auth/register`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, register, headers, 'POST');
  return response.content;
};

export const requestTokenValidation = async (token: string): Promise<RegisterResponse> => {
  const url = `${process.env.REACT_APP_API_URL}/auth/validate`;
  const headers = { 'content-type': 'application/json', Authorization: `bearer ${token}` };
  const response = await requestService(url, {}, headers, 'GET');
  return response.content;
};
