import express from "express";
import dotenv from "dotenv";
import csvRoutes from './routes/csv.routes.js';

import fs from "fs";

["src/uploads", "src/outputs"].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("src/public"));
app.use("/api/csv", csvRoutes);


app.listen(PORT, () =>  {
    console.log("server is running : 5000");
})