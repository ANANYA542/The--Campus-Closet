import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

// ------------------------ SIGNUP ------------------------
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        urnId: "URN" + Math.floor(10000000 + Math.random() * 90000000),
        role: role.toUpperCase(),
      },
    });

    res.json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------ LOGIN ------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        urnId: user.urnId,
      },
    });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------ FORGOT PASSWORD ------------------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(400).json({ message: "No account found with this email" });

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { email },
      data: { verifyToken: token },
    });

    const resetLink = `http://localhost:5174/reset-password?token=${token}`;

    const html = `
      <h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `;

    await sendEmail(user.email, "Reset Password", html);

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.log("Forgot Password Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ------------------------ RESET PASSWORD ------------------------
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { verifyToken: token } });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, verifyToken: null },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.log("Reset Password Error:", err);
    res.status(500).json({ error: err.message });
  }
};
