import axios from "axios";
import { getEnvVariables } from "@/shared/helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

// Todo: Configurar interceptores
// Permite interceptar las peticiones ya sea que vayan al backend o las que regresan
// En este caso aplicaremos al hacer una Request(Porque vamos a solicitar)
calendarApi.interceptors.request.use((config) => {
  // config.headers = {
  //   ...config.headers,
  //   "x-token": localStorage.getItem("TOKEN") || "",
  // };
  config.headers["x-token"] = localStorage.getItem("TOKEN") || "";
  return config;
});

export default calendarApi;