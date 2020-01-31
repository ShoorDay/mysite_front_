import http from "@/utils/http";

export const apiURL = "api-comment/";

export default {
  postCommentList(config) {
    return http.get(apiURL + "post_root_comments/", config);
  },
  postCommentRetrieve(pk, config) {
    return http.get(apiURL + "post_root_comments/" + pk + "/", config);
  },
  postCommentCreate(data, config) {
    return http.post(apiURL + "post_root_comments/", data, config);
  },
  postCommentUpdate(pk, data, config) {
    return http.patch(apiURL + "post_root_comments/" + pk + "/", data, config);
  }
};
