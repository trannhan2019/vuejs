import axios from "axios";

const baseURL = "http://localhost:8000";

const axiosClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
