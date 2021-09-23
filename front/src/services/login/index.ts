import { requestService } from '../../utils/requestService';
import { LoginData, RegisterData, LoginResponse, RegisterResponse } from '../../shared/@types/login';

export const requestLogin = async (login: LoginData): Promise<LoginResponse> => {
  const url = `http://localhost:8080/api/v1/justchatter/auth/login`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, login, headers, 'POST');
  return response.content;
};

export const requestRegister = async (register: RegisterData): Promise<RegisterResponse> => {
  const url = `http://localhost:8080/api/v1/justchatter/auth/register`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, register, headers, 'POST');
  return response.content;
};
