// attendanceRoutes.js
import express from "express";
import Attendance from "../models/attendanceModel.js"; // Assuming you have an Attendance model
import Student from "../models/Student.js"; // Assuming you have a Student model

const router = express.Router();

router.get("/students", async (req, res) => {
  try {
    const { course, year } = req.query;
    const students = await Student.find({ course, year });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { course, year, month, students } = req.body;
    if (!students.every(s => s.regNumber)) {
      return res.status(400).json({ message: "All students must have a registration number." });
    }

    console.log("Saving attendance for:", { course, year, month, students });

    let existingRecord = await Attendance.findOne({ course, year, month });

    if (existingRecord) {
      console.log(`Updating existing attendance record for ${course} - ${year} - ${month}`);

      students.forEach((newStudent) => {
        const existingStudent = existingRecord.students.find((s) => s.regNumber === newStudent.regNumber);
        if (existingStudent) {
          existingStudent.totalClasses = newStudent.totalClasses;
          existingStudent.attended = newStudent.attended;
        } else {
          existingRecord.students.push(newStudent);
        }
      });

      await existingRecord.save();
      return res.json({ message: "Attendance updated successfully" });
    } else {
      console.log("Creating new attendance record");
      const newAttendance = new Attendance({ course, year, month, students });
      await newAttendance.save();
      return res.json({ message: "Attendance saved successfully" });
    }

  } catch (err) {
    console.error("Error saving attendance:", err.message);
    res.status(500).json({ message: "Error saving attendance", error: err.message });
  }
});


export default router;
