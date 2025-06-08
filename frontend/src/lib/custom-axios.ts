import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const myAxios = axios.create({
  baseURL: BASE_URL,
});

export default myAxios;
