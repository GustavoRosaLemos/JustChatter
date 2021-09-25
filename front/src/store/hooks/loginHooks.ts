import { useCallback } from 'react';
import { requestLogin, requestRegister, requestTokenValidation } from '../../services/login';
import { LoginData, LoginResponse, RegisterData } from '../../shared/@types/login';

export const useRequestLogin = () =>
  useCallback(async (login: LoginData) => {
    const result = await requestLogin(login);
    return result;
  }, []);

export const useRequestRegister = () =>
  useCallback(async (register: RegisterData) => {
    const result = await requestRegister(register);
    return result;
  }, []);

export const useRequestTokenValidation = () =>
  useCallback(async (token: string) => {
    const result = await requestTokenValidation(token);
    return result;
  }, []);
