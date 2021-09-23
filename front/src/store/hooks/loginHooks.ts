import { useCallback } from 'react';
import { requestLogin, requestRegister } from '../../services/login';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../../shared/@types/login';

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
