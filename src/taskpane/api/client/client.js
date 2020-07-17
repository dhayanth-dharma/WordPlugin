import axios from "axios";
import configAxios from "./config";
import urlConfig from "../config.json";

const apisMapping = [
  ["www.dev.aitenders.com", "https://devapi.aitenders.com/v1.0"],
  ["", "http://localhost:8080/v1.0"]
];

// let API_URL = "http://localhost:8080/v1.0";
let API_URL = urlConfig.REACT_API_CLIENT_ID;

let currentInstance = "";

const buildUrl = url => {
  const keyValArray = apisMapping.find(keyValArr => keyValArr[0] === currentInstance.instance);
  if (keyValArray) {
    API_URL = keyValArray[1];
  }
  return url.startsWith("/", 0) ? `${API_URL + url}` : `${API_URL}/${url}`;
};

class Client {
  constructor() {
    const client = axios.create(configAxios);

    client.interceptors.request.use(function(config) {
      if (sessionStorage.getItem("token")) config.headers.Authorization = `${sessionStorage.getItem("token")}`;
      return config;
    });

    client.interceptors.response.use(
      function(res) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        if (res.config && res.config.url && res.config.url.includes("/login")) {
          return res;
        }

        return res.data;
      },
      function(err) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let error = "";
        if (err && err.response && err.response.data) {
          let message =
            err.response.data.message === "No message available"
              ? err.response.data.error
                ? err.response.data.error
                : "Operation has failed"
              : err.response.data.message;
          error = `${err.response.data.status} - ${message}`;
        }

        return Promise.reject(error || err);
      }
    );

    this.client = client;
  }

  setCurrentInstance(instance) {
    currentInstance = instance;
  }

  get(url, { params, config = {} } = {}) {
    return this.client.get(buildUrl(url), { params: params, ...config });
  }

  delete(url, { params, config = {} } = {}) {
    return this.client.delete(buildUrl(url), { params: params, ...config });
  }

  post(url, { payload, config = {} } = {}) {
    Object.assign(config, { headers: { "Content-Type": "application/json;charset=UTF-8" } });
    return this.client.post(buildUrl(url), payload || null, config);
  }
  postToDifferentEngine(url, { payload, config = {} } = {}) {
    Object.assign(config, { headers: { "Content-Type": "application/json;charset=UTF-8" } });
    return this.client.post("https://" + url, payload || null, config);
  }

  put(url, { payload, config = {} } = {}) {
    Object.assign(config, { headers: { "Content-Type": "application/json;charset=UTF-8" } });
    return this.client.put(buildUrl(url), payload || null, config);
  }

  patch(url, { payload, config = {} } = {}) {
    Object.assign(config, { headers: { "Content-Type": "application/json;charset=UTF-8" } });
    return this.client.patch(buildUrl(url), payload || null, config);
  }

  upload(url, file, { payload, config = {} } = {}) {
    const formData = new FormData();
    formData.append("file", file);
    if (payload) {
      formData.append(
        "payload",
        new Blob([JSON.stringify(payload)], {
          type: "application/json;charset=UTF-8"
        })
      );
    }

    Object.assign(config, { "Content-Type": undefined }); // Will be automatically set to multipart/form-data
    return this.client.post(buildUrl(url), formData, config);
  }
}

export default new Client();
