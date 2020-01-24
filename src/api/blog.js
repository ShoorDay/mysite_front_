import http from "@/utils/http";

export const apiURL = "api-blog/";

export default {
  postList(config) {
    return http.get(apiURL + "posts/", config);
  },
  postSimilar(pk, config) {
    return http.get(apiURL + "posts/" + pk + "/similar/", config);
  },
  postRetrieve(pk, config) {
    return http.get(apiURL + "posts/" + pk + "/", config);
  },
  postCreate(data, config) {
    return http.post(apiURL + "posts/", data, config);
  },
  postUpdate(pk, data, config) {
    return http.patch(apiURL + "posts/" + pk + "/", data, config);
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
  tagRetrieve(pk, config) {
    return http.get(apiURL + "tags/" + pk + "/", config);
  },
  categoryList(config) {
    return http.get(apiURL + "categories/", config);
  },
  categoryDisplay(pk, config) {
    return http.get(apiURL + "categories/" + pk + "/display/", config);
  },
  categoryRetrieve(pk, config) {
    return http.get(apiURL + "categories/" + pk + "/", config);
  },
  categoryCreate(data, config) {
    return http.post(apiURL + "categories/", data, config);
  },
  categoryDelete(pk, config) {
    return http.delete(apiURL + "categories/" + pk + "/", config);
  },
  categoryUpdate(pk, data, config) {
    return http.patch(apiURL + "categories/" + pk + "/", data, config);
  }
};
