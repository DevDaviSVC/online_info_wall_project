import express from "express";
import { authenticateToken } from "../utils/authUtils.js";
import Classroom from "../models/classroom.model.js";

const router = express.Router();

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { _id: id } = req.user;

    if (id === process.env.ADMIN_ID) {
      if (req.body?.serie) {
        const classroom = { serie: req.body.serie };
        const dbClassroom = await Classroom.create(classroom);
        return res
          .status(200)
          .json({ message: "Classroom created successfully!" });
      } else {
        return res.status(400).json({message: "The classroom's serie must be provided."});
      }
    } else {
      return res
        .status(401)
        .json({ message: "Only admins can create new classes." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/student", authenticateToken, async (req, res) => {
    try {
        
        const {_id: id} = req.user;

        if (id !== process.env.ADMIN_ID) return res.status(401).json({message: "Only admins can add new students to a classroom."});

        if (!req.body.studentId || !req.body.classroomId) return res.status(400).json({message: "Provide both the student and classroom ids."});

        

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;
