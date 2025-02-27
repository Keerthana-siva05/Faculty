import Faculty from "../models/Faculty.js";

// ✅ Update Faculty Activities (PUT request)
export const updateFacultyActivities = async (req, res) => {
  const { name, activities } = req.body;

  if (!name || !activities) {
    return res.status(400).json({ message: "Faculty name and activities are required." });
  }

  try {
    let faculty = await Faculty.findOne({ name });

    if (!faculty) {
      faculty = new Faculty({ name, activities });
    } else {
      faculty.activities = [...faculty.activities, ...activities];
    }

    await faculty.save();
    res.status(200).json({ message: "Activities updated successfully!", faculty });
  } catch (error) {
    console.error("Error updating faculty activities:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// ✅ Fetch All Faculty Activities (GET request)
export const getAllFacultyActivities = async (req, res) => {
  try {
    const facultyList = await Faculty.find({}, "name activities");
    res.status(200).json(facultyList);
  } catch (error) {
    console.error("Error fetching faculty activities:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
