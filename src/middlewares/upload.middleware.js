import multer from "multer";

const storage = multer.diskStorage({
    destination : "src/uploads", 
    filename: (_, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const uploadCSV = multer({
    storage,
    fileFilter: (_, file, cb) => {
        file.mimetype.includes("csv") ? cb(null, true) : cb (new Error("Only csv files are allowed here!"));
    }
})