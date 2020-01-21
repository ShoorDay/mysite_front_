import http from "@/utils/http";

export const apiURL = "api-blog/";

export default {
  postList(config) {
    return http.get(apiURL + "posts/", config);
  },
  postSimilar(id, config) {
    return http.get(apiURL + "posts/" + id + "/similar/", config);
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
  categoryDisplay(id, config) {
    return http.get(apiURL + "categories/" + id + "/display/", config);
  },
  categoryRetrieve(id, config) {
    return http.get(apiURL + "categories/" + id + "/", config);
  },
  categoryCreate(data, config) {
    return http.post(apiURL + "categories/", data, config);
  },
  categoryDelete(id, config) {
    return http.delete(apiURL + "categories/" + id + "/", config);
  },
  categoryUpdate(id, data, config) {
    return http.patch(apiURL + "categories/" + id + "/", data, config);
  }
};
