import express from "express"
import multer from "multer"
import { uploadPDF } from "../controllers/chatController.js"

const router = express.Router()
const upload = multer({ dest: "uploads/" }) // make sure uploads/ folder exists

// PDF upload route
router.post("/upload", upload.single("file"), uploadPDF)

export default router
