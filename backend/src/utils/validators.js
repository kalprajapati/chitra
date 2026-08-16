import { normalizeEmail } from "./emailUtils.js";

/**
 * Basic email format regex validator.
 */
export const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate Signup payload.
 * Returns { isValid: boolean, errors: string[], normalizedData: object }
 */
export const validateSignupInput = ({ name, email, password, phone, address }) => {
  const errors = [];

  // Name validation
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Full name is required.");
  } else if (name.trim().length > 100) {
    errors.push("Name cannot exceed 100 characters.");
  }

  // Email validation
  if (!email || !isValidEmail(email)) {
    errors.push("A valid email address is required.");
  }

  // Password validation (min 8 chars)
  if (!password || typeof password !== "string") {
    errors.push("Password is required.");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  } else if (password.length > 128) {
    errors.push("Password cannot exceed 128 characters.");
  }

  const normalizedEmail = normalizeEmail(email);

  return {
    isValid: errors.length === 0,
    errors,
    normalizedData: {
      name: name ? name.trim() : "",
      email: normalizedEmail,
      password,
      phone: phone ? phone.trim() : null,
      address: address ? address.trim() : null,
    },
  };
};

/**
 * Validate Login payload.
 * Returns { isValid: boolean, errors: string[], normalizedData: object }
 */
export const validateLoginInput = ({ email, password }) => {
  const errors = [];

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    errors.push("Email is required.");
  }

  if (!password || typeof password !== "string" || password.length === 0) {
    errors.push("Password is required.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalizedData: {
      email: normalizeEmail(email),
      password,
    },
  };
};
