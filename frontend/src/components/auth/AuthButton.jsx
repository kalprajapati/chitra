import React from "react";
import { Loader2 } from "lucide-react";

export const AuthButton = ({
  children,
  type = "submit",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  const baseClass =
    variant === "primary" ? "stitch-btn-primary" : "stitch-btn-secondary";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClass} w-full ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
