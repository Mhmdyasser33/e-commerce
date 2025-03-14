
import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const userDate = JSON.parse(userInfo);
        if (userDate && userDate.token) {
          config.headers.Authorization = `Bearer ${userDate.token}`;
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
