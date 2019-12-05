import axios from "axios";
import { Message } from "element-ui";
const config = require("@/config/config.js");
import { jwt, isExpired } from "@/utils/jwt.js";

const errorHandle = (status, others) => {
  switch (status) {
    case 401:
      Message("未登录状态，跳转登录页");
      break;
    case 403:
      Message("登录过期，请重新登录");
      break;
    case 404:
      Message("请求的资源不存在");
      break;
    default:
      console.log(others);
  }
};

const instance = axios.create({
  baseURL: config.url,
  timeout: 1000 * 12
});

instance.interceptors.request.use(
  config => {
    const access = window.localStorage.getItem("access");
    console.log(access);
    if (access) {
      const payload = jwt(access);
      if (!isExpired(payload["exp"])) {
        console.log(isExpired(payload["exp"]));
        config.headers.Authorization = "Bearer " + access;
      }
    }
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
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      window.localStorage.setItem("network", false);
    }
  }
);

export default instance;
