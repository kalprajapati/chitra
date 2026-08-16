import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { PasswordInput } from "../components/auth/PasswordInput";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthError } from "../components/auth/AuthError";

export const Signup = () => {
  const { signup, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setValidationError("");

    // Client-side validation
    if (!formData.name.trim()) {
      setValidationError("Full name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setValidationError("Email address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      setValidationError("Password is required.");
      return;
    }

    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || undefined,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Caught in context & displayed in AuthError
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join the Chitra Private Circle for bespoke commissions & member privileges."
    >
      <AuthError
        message={validationError || error}
        onClose={() => {
          setValidationError("");
          clearError();
        }}
      />

      <form onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="name"
          name="name"
          label="Full Name"
          type="text"
          placeholder="Kalp Prajapati"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />

        <AuthInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password (min 8 chars)"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <AuthInput
          id="phone"
          name="phone"
          label="Phone Number (Optional)"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
        />

        <div className="flex flex-col gap-1 w-full mb-6">
          <label
            htmlFor="address"
            className="text-xs uppercase tracking-[0.1em] font-medium text-[#454843]"
          >
            Shipping Address (Optional)
          </label>
          <textarea
            id="address"
            name="address"
            rows={2}
            placeholder="House, street, city, postal code..."
            value={formData.address}
            onChange={handleChange}
            className="stitch-line-input resize-none"
          />
        </div>

        <AuthButton type="submit" loading={loading} disabled={loading}>
          Create Account
        </AuthButton>
      </form>

      <div className="mt-8 border-t border-[#e4e2dd] pt-6 text-center">
        <p className="text-xs text-[#454843] font-light">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#1b1c19] hover:text-[#735c00] underline tracking-wider uppercase ml-1 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
