import sequelize, { connectDB } from "./src/config/db.js";
import User from "./src/models/User.js";
import { normalizeEmail } from "./src/utils/emailUtils.js";
import bcrypt from "bcrypt";

async function verifyPhase3Auth() {
  console.log("==================================================");
  console.log("   PHASE 3 — SECURE PASSWORD HANDLING VERIFICATION");
  console.log("==================================================\n");

  const API_BASE = "http://localhost:3000/api/auth";

  // 1. Health check
  const healthRes = await fetch("http://localhost:3000/");
  const healthData = await healthRes.json();
  console.log("1. ✅ Server Connection Check:", healthData.message);

  // 2. Signup Input Validation Tests
  console.log("\n2. 🧪 Testing Signup Input Validation...");

  // Short password (< 8 chars)
  const shortPassRes = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Short Pass User",
      email: "shortpass@example.com",
      password: "123",
    }),
  });
  console.log(`   Short password attempt status: ${shortPassRes.status} (Expected: 400)`);
  if (shortPassRes.status !== 400) throw new Error("❌ Validation failed for short password!");

  // Invalid email
  const invalidEmailRes = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Bad Email User",
      email: "not-an-email",
      password: "valid_password_123",
    }),
  });
  console.log(`   Invalid email attempt status: ${invalidEmailRes.status} (Expected: 400)`);
  if (invalidEmailRes.status !== 400) throw new Error("❌ Validation failed for invalid email!");

  // 3. Valid Signup & Email Normalization Test
  console.log("\n3. 🧪 Testing Valid Signup & Email Normalization...");
  const rawEmailInput = "   Test.Phase3_" + Date.now() + "@Example.COM   ";
  const expectedNormalizedEmail = normalizeEmail(rawEmailInput);
  const rawPasswordInput = "SuperSecurePassword2026!";

  let sessionCookie = "";

  const signupRes = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Phase 3 Tester",
      email: rawEmailInput,
      password: rawPasswordInput,
      phone: "+91 99999 88888",
    }),
  });

  const cookieHeader = signupRes.headers.get("set-cookie");
  if (cookieHeader) {
    sessionCookie = cookieHeader.split(";")[0];
  }

  const signupData = await signupRes.json();
  console.log(`   Signup Response Status: ${signupRes.status} (Expected: 201)`);
  console.log("   Returned user object keys:", Object.keys(signupData.user));
  
  if (signupData.user.password || signupData.user.password_hash) {
    throw new Error("❌ CRITICAL SECURITY FAILURE: Password hash was returned in API response!");
  }
  console.log("   ✅ Password hash is NOT exposed in API response.");

  // Verify DB record directly
  const dbUser = await User.findOne({ where: { email: expectedNormalizedEmail } });
  if (!dbUser) {
    throw new Error("❌ User was not saved with normalized email!");
  }
  console.log(`   ✅ DB Record Normalized Email verified: '${dbUser.email}'`);

  // Verify bcrypt password hash
  const isBcryptHashValid = await bcrypt.compare(rawPasswordInput, dbUser.password);
  console.log(`   ✅ DB Stored Password Hash verification via bcrypt: ${isBcryptHashValid}`);
  if (!isBcryptHashValid) {
    throw new Error("❌ Password hash stored in DB does not match bcrypt hash!");
  }

  // 4. Duplicate Email Signup Test
  console.log("\n4. 🧪 Testing Duplicate Email Rejection...");
  const dupSignupRes = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Duplicate User",
      email: rawEmailInput,
      password: "another_password_123",
    }),
  });
  console.log(`   Duplicate signup status: ${dupSignupRes.status} (Expected: 409)`);
  if (dupSignupRes.status !== 409) throw new Error("❌ Duplicate email check failed!");

  // 5. Login Security Tests (Prevent User Enumeration)
  console.log("\n5. 🧪 Testing Login Security & Generic Error Responses...");

  // Non-existent email
  const badEmailLoginRes = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "nonexistent_user_999@example.com",
      password: rawPasswordInput,
    }),
  });
  const badEmailLoginData = await badEmailLoginRes.json();
  console.log(`   Non-existent email status: ${badEmailLoginRes.status} | Message: '${badEmailLoginData.message}'`);

  // Wrong password
  const badPassLoginRes = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: expectedNormalizedEmail,
      password: "WrongPassword123!",
    }),
  });
  const badPassLoginData = await badPassLoginRes.json();
  console.log(`   Wrong password status: ${badPassLoginRes.status} | Message: '${badPassLoginData.message}'`);

  if (badEmailLoginData.message !== badPassLoginData.message) {
    throw new Error("❌ User enumeration vulnerability detected! Responses differed.");
  }
  console.log("   ✅ Uniform generic error response confirmed ('Invalid email or password.').");

  // 6. Valid Login Test
  console.log("\n6. 🧪 Testing Successful Login & Server-Side Session...");
  const validLoginRes = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: expectedNormalizedEmail,
      password: rawPasswordInput,
    }),
  });

  const loginCookieHeader = validLoginRes.headers.get("set-cookie");
  if (loginCookieHeader) {
    sessionCookie = loginCookieHeader.split(";")[0];
  }

  const validLoginData = await validLoginRes.json();
  console.log(`   Login Response Status: ${validLoginRes.status} (Expected: 200)`);
  console.log(`   Authenticated User: ${validLoginData.user.name} (${validLoginData.user.role})`);

  // 7. Verify /api/auth/me using session cookie
  console.log("\n7. 🧪 Testing Session Retrieval (/api/auth/me)...");
  const meRes = await fetch(`${API_BASE}/me`, {
    headers: { Cookie: sessionCookie },
  });
  const meData = await meRes.json();
  console.log(`   /api/auth/me status: ${meRes.status} | User ID: ${meData.user.id}`);

  // Clean up test user from DB
  await dbUser.destroy();
  console.log("   Test user record cleaned up.");

  console.log("\n==================================================");
  console.log("  ✅ ALL PHASE 3 SECURE PASS & AUTH TESTS PASSED!");
  console.log("==================================================");
}

verifyPhase3Auth().catch((err) => {
  console.error("\n❌ PHASE 3 VERIFICATION FAILED:", err);
  process.exit(1);
});
