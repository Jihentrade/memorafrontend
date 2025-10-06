const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUrl =
      process.env.MONGODB_URL ||
      process.env.MONGO_URL ||
      "mongodb://localhost:27017/memora_magnet";
    console.log("🔍 Tentative de connexion MongoDB...");
    console.log("URL utilisée:", mongoUrl);

    await mongoose.connect(mongoUrl, {});
    console.log("✅ Base de données connectée avec succès !");
  } catch (error) {
    console.log("❌ ERREUR CONNEXION DB:", error.message);
  }
};

module.exports = connectDB;
