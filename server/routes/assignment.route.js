import express from "express";
import { authenticateToken } from "../utils/authUtils.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
        const {name} = req.user;
        res.json({logged_as: name});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;