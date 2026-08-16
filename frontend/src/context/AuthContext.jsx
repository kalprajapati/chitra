import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { signup as apiSignup, login as apiLogin, logout as apiLogout, getCurrentUser } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session on mount
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loginUser = async (email, password) => {
    try {
      setError(null);
      const response = await apiLogin({ email, password });
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signupUser = async (userData) => {
    try {
      setError(null);
      const response = await apiSignup(userData);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      setError(null);
      await apiLogout();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login: loginUser,
        signup: signupUser,
        logout: logoutUser,
        clearError,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
