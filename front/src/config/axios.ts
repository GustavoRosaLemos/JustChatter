import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    pureHeaders: boolean;
  }
}
axios.interceptors.request.use((config) => {
  config.timeout = 100000;
  config.timeoutErrorMessage =
    'A resposta do servidor está demorando mais que o esperado. Por favor, tente novamente mais tarde';
  if (!config.pureHeaders) {
    let headers = config.headers ? config.headers : {};
    headers = {
      ...headers,
    };
    config.headers = headers;
  }
  return config;
});
