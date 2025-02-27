import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import {
  registerFaculty,
  loginFaculty,
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/register", registerFaculty);
router.post("/login", loginFaculty);
router.get("/profile", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);
router.post("/upload-image", verifyToken, upload.single("profileImage"), uploadProfileImage);

export default router;
