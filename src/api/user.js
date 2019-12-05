import http from "@/utils/http";

const baseURL = "api-user/";

export default {
  authenticate(config) {
    return http.post(baseURL + "token/", config);
  },
  signUp(config) {
    return http.post(baseURL + "users/", config);
  }
};
