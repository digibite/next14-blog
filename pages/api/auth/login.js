import bcrypt from "bcryptjs";
import pool from "../../../utils/db";
import jwt from "../../../utils/jwt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
