import React from "react";
import { AlertCircle } from "lucide-react";

export const AuthError = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-[#ffdad6]/40 border border-[#ba1a1a]/30 text-[#93000a] px-4 py-3 text-xs tracking-wide flex items-center justify-between mb-6 font-sans">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-[#ba1a1a] shrink-0" />
        <span>{message}</span>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-[#93000a] hover:text-[#1b1c19] text-base leading-none px-1"
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
};
