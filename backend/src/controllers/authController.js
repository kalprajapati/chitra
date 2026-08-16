import bcrypt from "bcrypt";
import User from "../models/User.js";
import { validateSignupInput, validateLoginInput } from "../utils/validators.js";

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Sanitizes a User model instance or object by stripping sensitive fields (password).
 */
const sanitizeUserResponse = (user) => {
  const userJson = user.toJSON ? user.toJSON() : { ...user };
  delete userJson.password;
  return userJson;
};

/**
 * Handler for User Registration (Signup)
 */
export const registerUser = async (req, res) => {
  try {
    const { isValid, errors, normalizedData } = validateSignupInput(req.body || {});

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: errors.join(" "),
        errors,
      });
    }

    const { name, email, password, phone, address } = normalizedData;

    // Check if user with normalized email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    // Hash password with bcrypt (never store or log plaintext password)
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    // Save new user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer", // Default role enforced
      phone,
      address,
    });

    // Initiate server-side session
    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regeneration failed during signup:", err.message);
        return res.status(500).json({
          success: false,
          message: "Internal server error during session creation.",
        });
      }

      // Store ONLY minimum required information in session
      req.session.userId = newUser.id;
      req.session.role = newUser.role;

      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session save failed during signup:", saveErr.message);
          return res.status(500).json({
            success: false,
            message: "Internal server error during session saving.",
          });
        }

        return res.status(201).json({
          success: true,
          message: "Account created successfully.",
          user: sanitizeUserResponse(newUser),
        });
      });
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during signup.",
    });
  }
};

/**
 * Handler for User Authentication (Login)
 */
export const loginUser = async (req, res) => {
  try {
    const { isValid, errors, normalizedData } = validateLoginInput(req.body || {});

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: errors.join(" "),
      });
    }

    const { email, password } = normalizedData;

    // Generic invalid credentials response to prevent user enumeration
    const INVALID_CREDENTIALS_RESPONSE = {
      success: false,
      message: "Invalid email or password.",
    };

    // Find user by normalized email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Do not reveal that email was not found
      return res.status(401).json(INVALID_CREDENTIALS_RESPONSE);
    }

    // Compare supplied password against stored hash using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      // Do not reveal that password was incorrect
      return res.status(401).json(INVALID_CREDENTIALS_RESPONSE);
    }

    // Regenerate session to prevent session fixation attacks
    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regeneration failed during login:", err.message);
        return res.status(500).json({
          success: false,
          message: "Internal server error during session initialization.",
        });
      }

      // Store ONLY minimum required information in session
      req.session.userId = user.id;
      req.session.role = user.role;

      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Session save failed during login:", saveErr.message);
          return res.status(500).json({
            success: false,
            message: "Internal server error during session saving.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Login successful.",
          user: sanitizeUserResponse(user),
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login.",
    });
  }
};

/**
 * Handler to destroy current user session (Logout)
 */
export const logoutUser = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(200).json({ success: true, message: "Logged out." });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err.message);
        return res.status(500).json({ success: false, message: "Failed to log out." });
      }

      res.clearCookie("sid");
      return res.status(200).json({
        success: true,
        message: "Logout successful.",
      });
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during logout.",
    });
  }
};

/**
 * Handler to fetch current authenticated user profile
 */
export const getCurrentSessionUser = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
    }

    const user = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GetCurrentSessionUser error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user session.",
    });
  }
};
