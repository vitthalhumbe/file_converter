import { convertToJSON } from "../services/csv.service.js";
import { deleteFile } from "../utils/fileCleanup.js";

export const csvToJSON = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }

  try {
    const outputPath = await convertToJSON(
      req.file.path,
      req.file.originalname
    );

    res.download(outputPath, () => {
      deleteFile(req.file.path);   // uploaded CSV
      deleteFile(outputPath);      // generated JSON
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
