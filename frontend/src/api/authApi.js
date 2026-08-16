import { apiClient } from "./apiClient";

/**
 * Register a new user account.
 * @param {Object} userData - { name, email, password, phone, address }
 */
export const signup = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

/**
 * Authenticate user credentials and establish session.
 * @param {Object} credentials - { email, password }
 */
export const login = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

/**
 * Destroy current user session and clear auth cookies.
 */
export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

/**
 * Fetch details of currently authenticated user session.
 */
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get("/auth/me");
    return response.data.user;
  } catch (error) {
    // 401 Unauthenticated is normal for guest visitors
    return null;
  }
};
