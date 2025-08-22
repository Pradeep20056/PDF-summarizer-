import fs from "fs";
import Pdf from "pdf-parse";

// Dynamic PDF parsing function
export async function parsePDF(file) {
  let dataBuffer;

  if (Buffer.isBuffer(file)) {
    dataBuffer = file;
  } else if (typeof file === "string") {
    if (!fs.existsSync(file)) throw new Error("PDF file not found: " + file);
    dataBuffer = fs.readFileSync(file);
  } else {
    throw new Error("Invalid file input");
  }

  const data = await Pdf(dataBuffer);
  return data.text;
}
