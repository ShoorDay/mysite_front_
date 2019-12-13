import http from "@/utils/http";

const HOSTING = {
  smms: { upload: "https://sm.ms/api/upload" }
};

export default {
  smms(data, config) {
    return http.post(
      { ...data, ssl: true },
      { baseURL: HOSTING.smms.upload, ...config }
    );
  }
};
