export interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

export interface FormLogin {
  login?: string;
  name?: string;
  email?: string;
  username?: string;
  password: string;
  passwordRepeat?: string;
}

export interface LoginResponse {
  _id: string;
  email: string;
  name: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  _id: string;
  email: string;
  name: string;
  username: string;
  token: string;
}
