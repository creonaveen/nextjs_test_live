'use client';
import axios from 'axios';

/* import { Storage } from '@/storages/LocalStorage';
import useUserLoginStore from '@/store/UserLogin'; */

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_API_URL,
  withCredentials: false,
  headers: { Authorization: 'Basic ZGV2ZWxvcGVyOkluc3RpdHV0dHZlaWVuMTA=' },
});

/* axiosInstance.interceptors.request.use(
  (config) => {
    const tokenData = Storage.getToken();
    if (tokenData) {
      config.headers.Authorization = `Token ${Storage.getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized error
          //   redirectToLogin();
          break;
        case 403:
          // Handle forbidden error
          break;
        case 404:
          // Handle not found error
          if (error.response.data.message.toLowerCase().includes('workspace not found')) {
          }
          break;
        case 500:
          // Handle internal server error
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);
/* 
function redirectToLogin() {
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    const { redirectToLogin: getRedirectPath } = useUserLoginStore.getState();
    const redirectPath = getRedirectPath(window.location.pathname, 'PUBLIC');
    window.location.href = redirectPath;
  }
} */

export const apiClient = {
  get: <T>(route: string, config?: any) =>
    axiosInstance.get<T>(route, { signal: config?.signal, params: config?.params }),
  post: <T>(route: string, data?: any, config?: any) =>
    axiosInstance.post<T>(route, data, { signal: config?.signal }),
  put: <T>(route: string, data?: any, config?: any) =>
    axiosInstance.put<T>(route, data, { signal: config?.signal }),
  patch: <T>(route: string, data?: any, config?: any) =>
    axiosInstance.patch<T>(route, data, { signal: config?.signal }),
  delete: <T>(route: string, data?: any) => axiosInstance.delete<T>(route, data),
  image: <T>(route: string, config?: any) => axiosInstance.get<T>(route, config),
};
