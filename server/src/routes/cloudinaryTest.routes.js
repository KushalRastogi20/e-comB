import express from "express";
import path from "path";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const router = express.Router();

router.get("/cloudinary-test", async (req, res) => {
  const filePath = path.join(process.cwd(), "public/ecom.jpg"); // adjust if your file is somewhere else
  const result = await uploadOnCloudinary(filePath);

  if (result) {
    res.json({ success: true, url: result.url });
  } else {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default router;
