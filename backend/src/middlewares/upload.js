const multer = require("multer");
const path = require("path");
const fs = require("fs");

const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

let storage;

if (isProduction) {
  console.log("📦 Mode PRODUCTION : Utilisation de Cloudinary");
  const { cloudinaryStorage } = require("../config/cloudinary");
  storage = cloudinaryStorage;
} else {
  console.log("💻 Mode DÉVELOPPEMENT : Utilisation du stockage local");
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      console.log("📁 Dossier upload:", uploadDir);
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

const uploadMultiple = upload.array("images", 9);

module.exports = { upload, uploadMultiple };
