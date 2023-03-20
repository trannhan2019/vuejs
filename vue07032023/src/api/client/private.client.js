import axios from "axios";

const baseURL = "http://localhost:8000/api";

const privateClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (err.response.status === 422) {
      // console.log(err);
      throw err.response.data;
    }

    throw err.response;
  }
);

export default privateClient;
