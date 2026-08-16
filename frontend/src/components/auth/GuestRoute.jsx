import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";

export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f4] flex flex-col items-center justify-center text-[#1b1c19]">
        <Loader2 className="w-8 h-8 animate-spin text-[#d4af37] mb-3" />
        <span className="font-serif text-lg tracking-[0.1em] uppercase text-[#757873]">
          Loading Chitra Experience...
        </span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
