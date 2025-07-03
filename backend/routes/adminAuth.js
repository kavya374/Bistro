import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🛂 Login attempt:", email);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("❌ Admin not found");
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ Admin logged in");
    res.json({ success: true, token });
  } catch (err) {
    console.error("🔥 Server error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});


export default router;
