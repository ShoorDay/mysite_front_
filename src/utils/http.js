import axios from "axios";
import qs from "qs";
import { Notification } from "element-ui";
import jwt from "@/utils/jwt.js";
const config = require("@/config/config.js");

axios.defaults.timeout = 1000 * 12;
axios.defaults.validateStatus = status => status >= 200 && status < 300;
axios.defaults.paramsSerializer = function(params) {
  return qs.stringify(params, {
    arrayFormat: "repeat"
  });
};

const errorHandle = (status, data) => {
  const message = data.message || data.detail || data.msg || "错误";
  switch (status) {
    case 401:
      Notification.error({
        title: "未登录状态，跳转登录页",
        message: message
      });
      break;
    case 403:
      Notification.error({
        title: "登录过期，请重新登录",
        message: message
      });
      break;
    case 404:
      Notification.error({
        title: "请求的资源不存在",
        message: message
      });
      break;
    case 429:
      Notification.warning({
        title: "请求过于频繁",
        message: message
      });
      break;
    default:
      console.log(data);
      console.log(message);
  }
};

axios.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data);
      return Promise.reject(response);
    } else {
      window.localStorage.setItem("network", false);
    }
  }
);

const instance = axios.create({
  baseURL: config.back_url
});

instance.interceptors.request.use(
  config => {
    const access = window.localStorage.getItem("access");
    if (access) {
      const payload = jwt.decode(access);
      if (!jwt.isExpired(payload["exp"])) {
        config.headers.Authorization = "Bearer " + access;
      }
    }
    console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const http_ = axios.create({});
export const axios_ = axios;
export const url = config.back_url;

export default instance;
