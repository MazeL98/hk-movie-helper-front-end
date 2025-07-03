import request from './request';
import type { AxiosRequestConfig } from 'axios';

export const get = (url: string,params?:any, config?: AxiosRequestConfig): Promise<any>=>
  request.get(url, {...config,params});

export const post = (url: string, data?: any, config?: AxiosRequestConfig): Promise<any> =>
  request.post(url, data, config);

export const put = (url: string, data?: any, config?: AxiosRequestConfig): Promise<any> =>
  request.put(url, data, config);

export const del = (url: string, config?: AxiosRequestConfig): Promise<any> =>
  request.delete(url, config);