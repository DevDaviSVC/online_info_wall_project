import express from "express";
import Student from "../models/student.model.js";
import { comparePassword, generateAccessToken, hashPassword } from "../utils/authUtils.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        
        const {student} = req.body;

        if (!student.rm || !student.password) return res.status(400).json({message: "Por favor, preencha todos os campos."});

        const dbStudent = await Student.findOne({rm: student.rm});
        if (!dbStudent) return res.status(404).json({message: "RM não encontrado."});

        const passwordsMatch = await comparePassword(student.password, dbStudent.password);
        if (!passwordsMatch) return res.status(403).json({message: "Senha incorreta."});

        const token = generateAccessToken({ ...student, name: dbStudent.name, _id: dbStudent._id });

        res.status(200).json({student: {...student, _id: dbStudent._id, name: dbStudent.name, password: dbStudent.password}, token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post("/register", async (req, res) => {
    try {
        const {student} = req.body;
        if (!student.name || !student.rm || !student.password) return res.status(400).json({message: "Por favor, preencha todos os campos."});

        const isRegistered = await Student.findOne({rm: student.rm});

        if (isRegistered) return res.status(400).json({message: "Esse RM já foi registrado."});

        const hashedPassword = await hashPassword(student.password);

        const dbStudent = await Student.create({...student, password: hashedPassword});
        const token = generateAccessToken({...student, _id: dbStudent._id});
        res.status(200).json({student: {...student, _id: dbStudent._id, password: hashedPassword}, token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.delete("/logout", async (req, res) => {

});

export default router;