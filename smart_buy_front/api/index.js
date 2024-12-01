import axios from "axios";
import { emitToast } from "@/app/_utils";

import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: "https://smartbuy-api.onrender.com/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 403) {
      location.replace("/");
    }
    console.error(error);
    emitToast("error", error.response.data.error);
    return Promise.reject(error);
  }
);

export default api;
