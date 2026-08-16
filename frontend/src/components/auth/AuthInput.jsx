import React from "react";

export const AuthInput = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  ...props
}) => {
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

      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`stitch-line-input ${
          error ? "border-b-[#ba1a1a]" : "border-b-[#c5c7c1]"
        }`}
        {...props}
      />

      {error && (
        <span className="text-xs text-[#ba1a1a] font-sans mt-1 tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
};
