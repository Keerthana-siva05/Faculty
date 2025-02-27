import express from "express";
import Attendance from "../models/attendanceModel.js"; // Ensure correct model import

const router = express.Router();

// ✅ Save or Update Attendance (Upsert)
router.post("/", async (req, res) => {
  try {
    console.log("Received Attendance Data:", req.body); // Debugging
    
    const { month, year, attendanceData } = req.body;
    
    if (!month || !year || !Array.isArray(attendanceData)) {
      console.error("Invalid data format:", req.body);
      return res.status(400).json({ message: "Invalid data format!" });
    }

    for (const record of attendanceData) {
      await Attendance.findOneAndUpdate(
        { regNumber: record.regNumber, month, year },
        {
          $set: {
            name: record.name,
            totalClasses: record.totalClasses,
            attended: record.attended,
            percentage: ((record.attended / record.totalClasses) * 100).toFixed(2),
            month,
            year,
          },
        },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Attendance saved successfully!" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Error saving attendance", error });
  }
});


// ✅ Get Attendance Records by Month & Year
router.get("/", async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required!" });
    }

    const attendanceRecords = await Attendance.find({ month, year });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Error fetching attendance records", error });
  }
});

// ✅ Delete an Attendance Record by Reg Number, Month & Year
router.delete("/:regNumber", async (req, res) => {
  try {
    const { regNumber } = req.params;
    console.log("Deleting record with regNumber:", regNumber); // Debugging

    const deletedRecord = await Attendance.findOneAndDelete({ regNumber });

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found!" });
    }

    res.status(200).json({ message: "Attendance record deleted successfully!" });
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    res.status(500).json({ message: "Error deleting attendance record", error });
  }
});






// ✅ Add a New Attendance Entry
router.post("/add", async (req, res) => {
  try {
    const { regNumber, name, totalClasses, attended, month, year } = req.body;

    if (!regNumber || !name || !totalClasses || !attended || !month || !year) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newAttendance = new Attendance({
      regNumber,
      name,
      totalClasses,
      attended,
      percentage: ((attended / totalClasses) * 100).toFixed(2),
      month,
      year,
    });

    await newAttendance.save();
    res.status(201).json({ message: "New attendance record added!" });
  } catch (error) {
    console.error("Error adding attendance record:", error);
    res.status(500).json({ message: "Error adding attendance record", error });
  }
});

export default router;
