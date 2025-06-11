import multer from "multer";
import fs from "fs";
import path from "path";
const uploadDir = "././uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single("image");

export const logoUpload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single("logoImage");

export const categoryUpload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single("categoryImage");

export const purchaseUpload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single("PurchaseImage");

export const packageUpload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
}).single("PackageImage");
