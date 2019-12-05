import http from "@/utils/http";

const baseURL = "api-user/";

export default {
  getToken(config) {
    return http.post(baseURL + "token/", config);
  }
};
