import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  activities: { type: [String], default: [] }, // Store activities as an array
});

export default mongoose.model("Faculty", FacultySchema);
