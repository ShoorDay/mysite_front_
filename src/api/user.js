import http from "@/utils/http";

export const apiURL = "api-user/";

export default {
  authenticate(data, config) {
    return http.post(apiURL + "token/", data, config);
  },
  signUp(data, config) {
    return http.post(apiURL + "users/", data, config);
  },
  tokenVerify(data, config) {
    return http.post(apiURL + "token/verify/", data, config);
  },
  userRetrieve(pk, config) {
    return http.get(apiURL + "users/" + pk + "/", config);
  }
};
