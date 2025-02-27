import User from "../models/User.js";

export const getAllFaculty = async (req, res) => {
    try {
      const facultyList = await User.find({ role: "faculty" }).select("name designation profileImage contactNumber");
      res.json(facultyList);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
