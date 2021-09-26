import { useCallback } from 'react';
import { requestLogin, requestRegister, requestTokenValidation } from '../../services/login';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../../shared/@types/login';

export const useRequestLogin = (): ((login: LoginData) => Promise<LoginResponse>) =>
  useCallback(async (login: LoginData) => {
    const result = await requestLogin(login);
    return result;
  }, []);

export const useRequestRegister = (): ((register: RegisterData) => Promise<RegisterResponse>) =>
  useCallback(async (register: RegisterData) => {
    const result = await requestRegister(register);
    return result;
  }, []);

export const useRequestTokenValidation = (): ((token: string) => Promise<RegisterResponse>) =>
  useCallback(async (token: string) => {
    const result = await requestTokenValidation(token);
    return result;
  }, []);
