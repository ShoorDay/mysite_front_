import http from "@/utils/http";
const config = require("@/config/config.js");

export const apiURL = "api-user/";
export const tp_types = {
  gh: {
    url: "github"
  }
};

export function getTpAuthUrl(type, now) {
  return (
    config.back_url +
    apiURL +
    "auth/" +
    tp_types[type].url +
    `/?callback=${config.front_url}third_party_auth/` +
    `&state=${type + "." + now + ".0"}`
  );
}

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
  },
  tpAuth(code, state) {
    const type = state.split(".")[0];
    return http.get(`${apiURL}auth/${tp_types[type].url}_callback/`, {
      params: {
        code,
        state
      }
    });
  }
};
