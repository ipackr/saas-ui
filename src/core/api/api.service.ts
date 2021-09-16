import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { PLATFORM_BASE_URL } from '../constants';

// const HOST = `https://${PLATFORM_BASE_URL}`;

export const Api: AxiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? undefined : HOST,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export function get<T = any, R = AxiosResponse<T>>(path: string, config?: AxiosRequestConfig) {
  return Api.get<T, R>(path, config)
    .then((res) => (res as unknown as AxiosResponse<T>).data);
};

export function post<T = any, R = AxiosResponse<T>>(path: string, data?: any, config?: AxiosRequestConfig) {
  return Api.post<T, R>(path, data, config)
    .then((res) => (res as unknown as AxiosResponse<T>).data);
}

export function put<T = any, R = AxiosResponse<T>>(path: string, data?: any, config?: AxiosRequestConfig) {
  return Api.put<T, R>(path, data, config)
    .then((res) => (res as unknown as AxiosResponse<T>).data);
}

export function del<T = any, R = AxiosResponse<T>>(path: string, config?: AxiosRequestConfig) {
  return Api.put<T, R>(path, config)
    .then((res) => (res as unknown as AxiosResponse<T>).data);
}
