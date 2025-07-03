import axios from 'axios';
import type {InternalAxiosRequestConfig } from 'axios'
import QS from 'qs';
import {message} from 'antd'
import { globalRouters } from '@/router';
const request = axios.create({
  baseURL: '/api', 
  timeout: 10000,
});


request.interceptors.request.use((config:InternalAxiosRequestConfig<any>) => {
//  const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
//   //在每次的请求中添加token
//   config.data = Object.assign({}, config.data, {
//     token: token,
//   })

  //设置请求头
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
  //序列化请求参数，不然post请求参数后台接收不正常
  config.data = QS.stringify(config.data)
  return config

},(error) => Promise.reject(error));

request.interceptors.response.use(
  (response) => {

      if (response.status) {
    switch (response.status) {
      case 200:
        return response.data.data;
      case 401:
        //未登录处理方法
        break;
      case 403:
        //token过期处理方法
        break;

      default:
        message.error(response.data.message)
    }
  } else { 
    return response;
  }

  },
  (error) => {
    const status = error.response?.status
    if(status >= 500) {
      message.error('服务器错误，请稍后重试')
      globalRouters.navigate('/500')
    }
    return Promise.reject(error);
  }
);

export default request;