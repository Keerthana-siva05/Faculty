import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  regNumber: { type: String, required: true },
  name: { type: String, required: true },
  totalClasses: { type: Number, required: true },
  attended: { type: Number, required: true },
  percentage: { type: String, required: true },
  month: { type: String, required: true }, // Ensure this field exists
  year: { type: String, required: true }   // Ensure this field exists
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
