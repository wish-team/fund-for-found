import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://fund-for-found.onrender.com";
console.log("API Base URL:", baseURL);

// Add request interceptor for debugging
const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { client };
