import auth from "../../../middleware/auth";
import pool from "../../../utils/db";

async function handler(req, res) {
  if (req.method === "GET") {
    const [posts] = await pool.query("SELECT * FROM posts");
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, userId]
    );
    const post = { id: result.insertId, title, content, user_id: userId };
    return res.status(201).json(post);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export default auth(handler);
