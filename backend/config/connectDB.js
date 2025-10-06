const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔍 Tentative de connexion MongoDB...");

    // URL par défaut si MONGODB_URL n'est pas définie
    const mongoUrl =
      process.env.MONGODB_URL || "mongodb://localhost:27017/memora_magnet";
    console.log("MONGODB_URL défini:", !!process.env.MONGODB_URL);
    console.log("URL utilisée:", mongoUrl);

    await mongoose.connect(mongoUrl, {});
    console.log("✅ Base de données connectée avec succès !");
  } catch (error) {
    console.log("❌ ERREUR CONNEXION DB:", error.message);
    console.log("MONGODB_URL disponible:", !!process.env.MONGODB_URL);
  }
};

module.exports = connectDB;
