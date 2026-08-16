import axios from "axios";

// Environment-based API Base URL (defaults to backend server on localhost:3000)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enables server-side HTTP-Only session cookies
});

// Interceptor for uniform error response handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract server message or fallback
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected network error occurred.";
    return Promise.reject(new Error(message));
  }
);
