import express from "express";
import { updateFacultyActivities, getAllFacultyActivities } from "../controllers/facultyActivitiesController.js";

const router = express.Router();

router.put("/update-activities", updateFacultyActivities);
router.get("/activities", getAllFacultyActivities);

export default router;
