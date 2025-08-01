import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./utils/authUtils.js";
dotenv.config();

// Importing routes

import AuthRoutes from "./routes/auth.route.js";
import AssignmentRoutes from "./routes/assignment.route.js";
import ClassroomRoutes from "./routes/classroom.route.js";

const app = express();

// Middlewares

app.use(express.json());

// Connecting to DB and start server

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}!`);
    });
  })
  .catch(() => {
    console.log("Something went wrong while connecting to database.");
  });

// Routes

app.use("/auth", AuthRoutes);
app.use("/assignment", AssignmentRoutes);
app.use("/classroom", ClassroomRoutes);

app.get("/", authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

const posts = [
  {
    username: "Joe",
    title: "Post 1"
  },
  {
    username: "Jim",
    title: "Post 2"
  }
];

const refreshTokens = [];

app.post("/login", (req, res) => {
  // Authenticate User

  const { username } = req.body;
  const user = {
    name: username
  };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.json({accessToken, refreshToken});
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json({message: "No tokens provided."});
  if (!refreshTokens.includes(refreshToken)) return res.status(403).json({message: "Invalid refresh token."});
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({message: "Invalid token."});
    const accessToken = generateAccessToken({name: user.name});
    res.status(200).json({accessToken});
  })
});

app.delete("/logout", (req, res) => {
  const {refreshToken} = req.body;
  refreshTokens = refreshTokens.filter(tokens => tokens !== refreshToken);
});

// 17:00