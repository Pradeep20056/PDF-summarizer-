import fs from "fs"
import { parsePDF } from "../lib/pdf-parse-wrapper.js" // make sure the path is correct

export const uploadPDF = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const text = await parsePDF(req.file.path);

        // Delete temp file
        fs.unlinkSync(req.file.path);

        res.json({ text });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
