import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { inferType } from "../utils/typeInference.js";

export const convertToJSON = (filePath, originalName) => {
  return new Promise((resolve, reject) => {
    const results = [];

    const baseName = path.parse(originalName).name;
    const outputFile = `src/outputs/${baseName}.json`;

    fs.createReadStream(filePath)
      .pipe(csv({
        mapHeaders: ({ header }) => header.replace(/\uFEFF/g, ""),
        strict: false
      }))
      .on("data", (row) => {
        const parsedRow = {};
        for (let key in row) {
          parsedRow[key] = inferType(row[key]);
        }
        results.push(parsedRow);
      })
      .on("end", () => {
        fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
        resolve(outputFile);
      })
      .on("error", reject);
  });
};
