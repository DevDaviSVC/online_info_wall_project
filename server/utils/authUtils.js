import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1w"});
};

const saltRounds = 10;

async function hashPassword (password) {
    return await bcrypt.hash(password, saltRounds);
};

async function comparePassword (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Authentication error." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
}

export { generateAccessToken, hashPassword, comparePassword, authenticateToken };
