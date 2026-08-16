import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { PasswordInput } from "../components/auth/PasswordInput";
import { AuthButton } from "../components/auth/AuthButton";
import { AuthError } from "../components/auth/AuthError";

export const Login = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setValidationError("");

    // Client-side validation
    if (!email.trim()) {
      setValidationError("Please enter your email address.");
      return;
    }

    if (!password) {
      setValidationError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error message is set in AuthContext & caught here
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your private account to access bespoke collections & order history."
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
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <div className="flex justify-end mb-6">
          <a
            href="#forgot-password"
            className="text-xs text-[#757873] hover:text-[#1b1c19] underline tracking-wide font-sans transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        <AuthButton type="submit" loading={loading} disabled={loading}>
          Sign In
        </AuthButton>
      </form>

      <div className="mt-8 border-t border-[#e4e2dd] pt-6 text-center">
        <p className="text-xs text-[#454843] font-light">
          New to Chitra?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#1b1c19] hover:text-[#735c00] underline tracking-wider uppercase ml-1 transition-colors"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
