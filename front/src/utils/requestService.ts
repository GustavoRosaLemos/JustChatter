import axios, { AxiosRequestConfig, Method } from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const requestService = async (
  url: string,
  body: unknown,
  headers: unknown,
  method: Method = 'GET',
  pureHeaders = false,
) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data: body,
      headers,
      pureHeaders,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw error;
  }
};
