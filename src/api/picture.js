import { http_, url, axios_ as axios } from "@/utils/http";
import http from "@/utils/http";

const instance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data" //请求头
  }
});

const HOSTING = {
  smms: {
    upload: "https://sm.ms/api/upload"
  }
};

export const apiURL = "api-picture/";

export default {
  tp_iamgeList(config) {
    return http.get(url + apiURL + "to_images/", config);
  },
  tp_iamgeRetrieve(id, config) {
    return http.get(url + apiURL + "to_images/" + id + "/", config);
  },
  tp_iamgeCreate(data, config) {
    return http.post(url + apiURL + "to_images/", data, config);
  },
  hostingList(config) {
    return http.get(url + apiURL + "hostings/", config);
  },
  hostingRetrieve(id, config) {
    return http.get(url + apiURL + "hostings/" + id + "/", config);
  },
  hostingCreate(data, config) {
    return http.post(url + apiURL + "hostings/", data, config);
  },
  albumList(config) {
    return http.get(url + apiURL + "albums/", config);
  },
  albumRetrieve(id, config) {
    return http.get(url + apiURL + "albums/" + id + "/", config);
  },
  albumCreate(data, config) {
    return http.post(url + apiURL + "albums/", data, config);
  },
  smms(data, config) {
    return instance.post(HOSTING.smms.upload, data, config);
  }
};
