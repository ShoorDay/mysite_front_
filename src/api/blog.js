import http from "@/utils/http";

export const apiURL = "api-blog/";

export default {
  postList(config) {
    return http.get(apiURL + "posts/", config);
  },
  postRetrieve(id, config) {
    return http.get(apiURL + "posts/" + id + "/", config);
  },
  postCreate(data, config) {
    return http.post(apiURL + "posts/", data, config);
  },
  postUpdate(id, data, config) {
    return http.patch(apiURL + "posts/" + id + "/", data, config);
  },
  tagList(config) {
    return http.get(apiURL + "tags/", config);
  },
  tagExists(config) {
    return http.get(apiURL + "tags/exists/", config);
  },
  tagExistsOrCreate(data, config) {
    return http.post(apiURL + "tags/exists/", data, config);
  },
  tagRetrieve(id, config) {
    return http.get(apiURL + "tags/" + id + "/", config);
  },
  categoryList(config) {
    return http.get(apiURL + "categories/", config);
  },
  categoryRetrieve(id, config) {
    return http.get(apiURL + "categories/" + id + "/", config);
  }
};
