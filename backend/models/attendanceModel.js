import mongoose from "mongoose";

const StudentAttendanceSchema = new mongoose.Schema({
  regNumber: { type: String, required: true },  // ✅ Make sure regNumber is REQUIRED
  name: { type: String, required: true },
  totalClasses: { type: Number, required: true },
  attended: { type: Number, required: true },
});

const AttendanceSchema = new mongoose.Schema({
  course: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  students: [StudentAttendanceSchema], // ✅ Store students correctly
});

// ✅ Ensure uniqueness only on (course, year, month)
AttendanceSchema.index({ course: 1, year: 1, month: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
