import fs from "fs";

export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("File cleanup failed:", err.message);
    }
  });
};
