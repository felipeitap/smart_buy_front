import axios from "axios";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: "http://localhost:3001/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response.data.error);
    toast.error(error.response.data.error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    return Promise.reject(error);
  }
);

export default api;
