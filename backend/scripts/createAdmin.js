import "dotenv/config";
import mongoose from "mongoose";
import User from "../src/models/User.js";
import { hashPassword } from "../src/utils/passwords.js";

const email = process.argv[2] || "admin@shop.com";
const password = process.argv[3] || "Admin#12345";

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  const exists = await User.findOne({ email });
  if (exists) {
    exists.role = "ADMIN";
    if (password) exists.passwordHash = await hashPassword(password);
    await exists.save();
    console.log("Updated existing user to ADMIN:", email);
  } else {
    const passwordHash = await hashPassword(password);
    await User.create({ email, passwordHash, role: "ADMIN" });
    console.log("Created ADMIN:", email);
  }
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
