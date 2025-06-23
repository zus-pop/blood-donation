import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const myAxios = axios.create({
  baseURL: BASE_URL,
});

myAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default myAxios;
