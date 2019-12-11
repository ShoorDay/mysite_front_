import http from "@/utils/http";

const baseURL = "api-user/";

export default {
  authenticate(data, config) {
    return http.post(baseURL + "token/", data, config);
  },
  signUp(data, config) {
    return http.post(baseURL + "users/", data, config);
  },
  tokenVerify(data, config) {
    return http.post(baseURL + "token/verify/", data, config);
  },
  userRetrieve(id, config) {
    return http.get(baseURL + "users/" + id + "/", config);
  }
};
