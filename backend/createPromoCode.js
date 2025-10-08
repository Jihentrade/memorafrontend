// Script pour créer un code promo de test dans la base de données
// Usage: node createPromoCode.js

require("dotenv").config();
const mongoose = require("mongoose");
const CodeReduction = require("./src/models/codeReduction");

const createPromoCode = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connecté à MongoDB");

    // Créer des codes promo de test
    const promoCodes = [
      {
        code: "PROMO10",
        reduction: 10,
        actif: true,
      },
      {
        code: "PROMO20",
        reduction: 20,
        actif: true,
      },
      {
        code: "PROMO50",
        reduction: 50,
        actif: true,
      },
    ];

    for (const promoData of promoCodes) {
      // Vérifier si le code existe déjà
      const existingCode = await CodeReduction.findOne({
        code: promoData.code,
      });

      if (existingCode) {
        console.log(`⚠ Code "${promoData.code}" existe déjà`);
      } else {
        const newPromo = await CodeReduction.create(promoData);
        console.log(
          `✓ Code promo créé : ${newPromo.code} - Réduction : ${newPromo.reduction}%`
        );
      }
    }

    console.log("\n✓ Codes promo créés avec succès!");
    console.log("\nCodes disponibles :");
    console.log("- PROMO10 (10% de réduction)");
    console.log("- PROMO20 (20% de réduction)");
    console.log("- PROMO50 (50% de réduction)");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  }
};

createPromoCode();
