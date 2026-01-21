import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5010/api",
    baseURL: "https://interioverse-designs-backend.onrender.com",
            
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Silence the 401 error (do nothing)
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
