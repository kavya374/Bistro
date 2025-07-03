import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Admin } from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Ensure this is set in your .env

    const hashedPassword = await bcrypt.hash("12345678", 10); // 🔒 Replace with strong password

    const newAdmin = new Admin({
      email: "bistro123@example.com",
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
