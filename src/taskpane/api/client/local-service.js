import axios from "axios";
import configAxios from "./config";

// const API_URL = process.env.REACT_APP_API;
const API_URL = "https://devapi.aitenders.com/v1.0";
const buildUrl = url => {
  console.log(API_URL);
  return url.startsWith("/", 0) ? `${API_URL + url}` : `${API_URL}/${url}`;
};
class Client {
  constructor() {
    const client = axios.create(configAxios);

    client.interceptors.request.use(function(config) {
      if (sessionStorage.getItem("token")) config.headers.Authorization = `${sessionStorage.getItem("token")}`;
      return config;
    });
  }
}
