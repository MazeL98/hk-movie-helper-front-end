import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import QS from "qs";
import { message } from "antd";
import { globalRouters } from "@/router";
const baseURL = import.meta.env.VITE_BASE_URL;

const request = axios.create({
    baseURL,
    timeout: 10000,
});

function setAccessToken(token: string) {
  const info = localStorage.getItem('user')
 if(!info) return;
  const userInfo =JSON.parse(info)
  localStorage.setItem('user',{...userInfo,accessToken: token})
}

function getAccessToken() {
     const info = localStorage.getItem('user')
 if(!info) return;
  const userInfo =JSON.parse(info)
  return userInfo.accessToken
}

// 拦截请求
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {

        const accessToken = getAccessToken()
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        //设置请求头
        config.headers["Content-Type"] =
            "application/x-www-form-urlencoded; charset=utf-8";
        //序列化请求参数，不然post请求参数后台接收不正常
        config.data = QS.stringify(config.data);
        return config;
    },
    (error) => Promise.reject(error)
);

// 拦截响应
// 非2xx状态码的默认被catch
request.interceptors.response.use(
    (response) => {
        return response.data.data ?? response.data;
    },
    async (error) => {
        const originalReq = error.config;
        // 如果是/refresh请求失败，直接抛出不再拦截重试
        if (originalReq?.headers?.skipAuth) {
            return Promise.reject(error);
        }

        const status = error.response?.status;
        if (status >= 500) {
            message.error("服务器错误，请稍后重试");
            globalRouters.navigate("/500");
        }
        else if (status === 401) {
          //登录失败或者是token过期
            if (originalReq.url.includes("/login")) {
                return Promise.reject(error);
            }
            if (!originalReq._retry) {
                originalReq._retry = true;
                try {
                    console.log("accessToken 过期，尝试刷新token...");
                    // 调用刷新接口来获取新的accessToken
                    const refreshResult = await request.post(
                        "/user/refresh",
                        {},
                        { headers: { skipAuth: true }, withCredentials: true }
                    );
                    console.log("刷新Token结果", refreshResult);
                    const newAccessToken = refreshResult.data.accessToken;
                    setAccessToken(newAccessToken);
                    // 更新header
                    originalReq.headers[
                        "authorization"
                    ] = `Bearer ${newAccessToken}`;
                    // 重试原请求
                    return request(originalReq);
                } catch (refreshError) {
                    // 刷新失败无法获取新accessToken
                    console.error("刷新 token 失败", refreshError);
                    globalRouters.navigate("/");
                    return Promise.reject(refreshError);
                }
            }
        } // 处理权限不够导致的请求失败
        else if (status === 403) {
            message.error("您没有权限访问该资源");
        }
        return Promise.reject(error);
    }
);

export default request;
