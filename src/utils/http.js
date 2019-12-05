import axios from "axios";
import { Notification } from "element-ui";
import jwt from "@/utils/jwt.js";
const config = require("@/config/config.js");

const errorHandle = (status, data) => {
  const message = data.message || data.detail || data.msg;
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
      console.log(message);
  }
};

const instance = axios.create({
  baseURL: config.url,
  timeout: 1000 * 12
});

instance.interceptors.request.use(
  config => {
    const access = window.localStorage.getItem("access");
    if (access) {
      const payload = jwt.decode(access);
      console.log(jwt.isExpired(payload["exp"]));
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

instance.interceptors.response.use(
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

export default instance;
