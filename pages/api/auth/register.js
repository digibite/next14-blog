import bcrypt from "bcryptjs";
import pool from "../../../utils/db";

export default async function handler(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "user"]
    );
    res.status(201).json({ id: rows.insertId, name, email, role: "user" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
