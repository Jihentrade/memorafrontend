const router = require("express").Router();

router.get("/config", (req, res) => {
  const config = {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    isProduction: process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
    hasCloudinary: {
      CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
      API_KEY: !!process.env.CLOUDINARY_API_KEY,
      API_SECRET: !!process.env.CLOUDINARY_API_SECRET,
    },
    cloudinaryValues: {
      CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? "défini (caché)" : "❌ NON DÉFINI",
      API_KEY: process.env.CLOUDINARY_API_KEY ? "défini (caché)" : "❌ NON DÉFINI",
      API_SECRET: process.env.CLOUDINARY_API_SECRET ? "défini (caché)" : "❌ NON DÉFINI",
    },
    storageMode: (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") ? "CLOUDINARY" : "LOCAL",
    mongoConnected: process.env.MONGODB_URL ? "défini" : "❌ NON DÉFINI",
  };

  res.json(config);
});

module.exports = router;

