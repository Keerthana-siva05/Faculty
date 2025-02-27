import express from "express";
import { getAllFaculty } from "../controllers/facultyController.js";

const router = express.Router();

router.get("/", getAllFaculty); // ✅ Make sure this route exists!

export default router;
