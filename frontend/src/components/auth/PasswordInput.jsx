import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({
  id,
  name,
  label = "Password",
  value,
  onChange,
  placeholder = "••••••••",
  error,
  required = false,
  autoComplete = "current-password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full mb-5 relative">
      {label && (
        <label
          htmlFor={id || name}
          className="text-xs uppercase tracking-[0.1em] font-medium text-[#454843]"
        >
          {label} {required && <span className="text-[#ba1a1a]">*</span>}
        </label>
      )}

      <div className="relative flex items-center w-full">
        <input
          id={id || name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`stitch-line-input pr-10 ${
            error ? "border-b-[#ba1a1a]" : "border-b-[#c5c7c1]"
          }`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-0 bottom-3 text-[#757873] hover:text-[#1b1c19] focus:outline-none transition-colors p-1"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {error && (
        <span className="text-xs text-[#ba1a1a] font-sans mt-1 tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
};
