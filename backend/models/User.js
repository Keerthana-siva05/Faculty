import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["faculty"], default: "faculty" },
  department: { type: String },
  designation: { type: String },
  profileImage: { type: String },
  contactNumber: { type: String }  
});

export default mongoose.model("User", userSchema);
