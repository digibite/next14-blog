const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "your_secret_key";

module.exports = {
  sign: (payload) => jwt.sign(payload, secret, { expiresIn: "1d" }),
  verify: (token) => jwt.verify(token, secret),
};
