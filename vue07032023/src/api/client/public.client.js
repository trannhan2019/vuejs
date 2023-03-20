import axios from "axios";

const baseURL = "http://localhost:8000/api";

const publicClient = axios.create({
  baseURL,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// publicClient.interceptors.request.use(async (config) => {
//   return {
//     ...config,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
// });

publicClient.interceptors.response.use(
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

export default publicClient;
