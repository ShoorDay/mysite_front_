import http from "@/utils/http";

const baseURL = "api-blog/";

export default {
  postList(config) {
    return http.get(baseURL + "posts/", config);
  },
  postRetrieve(id, config) {
    return http.get(baseURL + "posts/" + id + "/", config);
  },
  tagList(config) {
    return http.get(baseURL + "tags/", config);
  },
  categoryList(config) {
    return http.get(baseURL + "categories/", config);
  }
};
