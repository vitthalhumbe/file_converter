import express from "express";
import { uploadCSV } from "../middlewares/upload.middleware.js";
import { csvToJSON } from "../controllers/csv.controller.js";


const router = express.Router();

router.post("/to-json", uploadCSV.single("file"), csvToJSON);

export default router;