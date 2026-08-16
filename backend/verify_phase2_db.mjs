import sequelize, { connectDB } from "./src/config/db.js";
import User from "./src/models/User.js";
import { normalizeEmail } from "./src/utils/emailUtils.js";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import bcrypt from "bcrypt";

async function verifyDatabaseAndSessions() {
  console.log("==================================================");
  console.log("      PHASE 2 — DATABASE & SESSION VERIFICATION   ");
  console.log("==================================================\n");

  await connectDB();

  // 1. Sync models with MySQL DB
  await sequelize.sync();
  console.log("1. ✅ Database connection and table sync succeeded.");

  // 2. Inspect users table schema in MySQL
  const [columns] = await sequelize.query("DESCRIBE users;");
  console.log("\n2. ✅ Users Table Schema in MySQL:");
  columns.forEach((col) => {
    console.log(`   - ${col.Field}: ${col.Type} | Null: ${col.Null} | Key: ${col.Key} | Default: ${col.Default}`);
  });

  // 3. Inspect indexes on users table
  const [indexes] = await sequelize.query("SHOW INDEX FROM users;");
  console.log("\n3. ✅ Users Table Indexes:");
  indexes.forEach((idx) => {
    console.log(`   - Index: ${idx.Key_name} on column: ${idx.Column_name} (Non_unique: ${idx.Non_unique})`);
  });

  // 4. Test Email Uniqueness Constraint in MySQL
  console.log("\n4. 🧪 Testing DB-Level Email Uniqueness Constraint...");
  const testEmail = normalizeEmail(`uniq_test_${Date.now()}@example.com`);
  const dummyHash = await bcrypt.hash("Pass123!", 10);

  // Insert first user
  const user1 = await User.create({
    name: "User One",
    email: testEmail,
    password: dummyHash,
  });
  console.log(`   User 1 inserted successfully (ID: ${user1.id}, Role: ${user1.role}).`);

  // Attempt duplicate insert
  let duplicatePrevented = false;
  try {
    await User.create({
      name: "User Two Duplicate",
      email: testEmail,
      password: dummyHash,
    });
  } catch (err) {
    duplicatePrevented = true;
    console.log(`   ✅ DB Duplicate Prevention Verified! Threw expected error: ${err.name} (${err.message})`);
  }

  if (!duplicatePrevented) {
    throw new Error("❌ CRITICAL: Database failed to prevent duplicate email!");
  }

  // 5. Test Default Role behavior
  console.log("\n5. 🧪 Testing Role Default ('customer')...");
  console.log(`   Created user role is: '${user1.role}' (Expected: 'customer')`);
  if (user1.role !== "customer") {
    throw new Error("❌ Role default failed!");
  }

  // 6. Test Parameterized Queries / SQL Injection Protection
  console.log("\n6. 🧪 Testing SQL Injection Protection...");
  const maliciousInput = "' OR '1'='1";
  const sqlInjResult = await User.findOne({ where: { email: maliciousInput } });
  console.log(`   Query result for SQL injection payload: ${sqlInjResult} (Expected: null)`);
  if (sqlInjResult !== null) {
    throw new Error("❌ Vulnerability detected in query layer!");
  }

  // 7. Verify MySQL Session Store
  console.log("\n7. 🧪 Testing MySQL Session Store (create, retrieve, destroy)...");
  const SequelizeStore = connectSessionSequelize(session.Store);
  const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: "sessions",
  });
  await sessionStore.sync();

  const [sessionCols] = await sequelize.query("DESCRIBE sessions;");
  console.log("   Sessions Table Schema in MySQL:");
  sessionCols.forEach((col) => {
    console.log(`   - ${col.Field}: ${col.Type} | Null: ${col.Null} | Key: ${col.Key}`);
  });

  // Test session set / get / touch / destroy
  const testSid = `test_sid_${Date.now()}`;
  const testSessionData = {
    cookie: { originalMaxAge: 86400000, expires: new Date(Date.now() + 86400000).toISOString() },
    userId: user1.id,
    userRole: user1.role,
  };

  // Set session
  await new Promise((resolve, reject) => {
    sessionStore.set(testSid, testSessionData, (err) => (err ? reject(err) : resolve()));
  });
  console.log("   ✅ Session record created in MySQL sessions table.");

  // Get session
  const retrievedSession = await new Promise((resolve, reject) => {
    sessionStore.get(testSid, (err, sess) => (err ? reject(err) : resolve(sess)));
  });
  console.log("   ✅ Session record retrieved from MySQL:", retrievedSession);
  if (!retrievedSession || retrievedSession.userId !== user1.id) {
    throw new Error("❌ Session retrieval mismatched!");
  }

  // Destroy session
  await new Promise((resolve, reject) => {
    sessionStore.destroy(testSid, (err) => (err ? reject(err) : resolve()));
  });
  console.log("   ✅ Session record destroyed in MySQL sessions table.");

  // Clean up test user
  await user1.destroy();
  console.log("   Test user cleaned up.");

  console.log("\n==================================================");
  console.log("  ✅ ALL PHASE 2 DATABASE & SESSION TESTS PASSED! ");
  console.log("==================================================");
}

verifyDatabaseAndSessions().catch((err) => {
  console.error("\n❌ PHASE 2 VERIFICATION FAILED:", err);
  process.exit(1);
});
