// Ajouter le code promo OUMA98 dans la base de données de PRODUCTION
require("dotenv").config();
const mongoose = require("mongoose");

const addPromoToProduction = async () => {
  try {
    console.log("\n🌍 AJOUT DU CODE PROMO EN PRODUCTION\n");
    console.log("─".repeat(50));

    // Connexion à la base de production (depuis .env)
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL;

    if (!mongoUrl) {
      console.error("❌ ERREUR : MONGODB_URL non défini dans .env");
      process.exit(1);
    }

    console.log("\n1️⃣ Connexion à MongoDB...");
    console.log("   URL:", mongoUrl.replace(/:[^:@]+@/, ":****@"));
    await mongoose.connect(mongoUrl);
    console.log("   ✅ Connecté\n");

    console.log("2️⃣ Vérification du code OUMA98...");

    // Vérifier si le code existe
    const existing = await mongoose.connection.db
      .collection("codereductions")
      .findOne({ code: "OUMA98" });

    if (existing) {
      console.log("   ⚠️  Le code OUMA98 existe déjà !");
      console.log("\n   📊 Détails :");
      console.log("      Code:", existing.code);
      console.log("      Réduction:", existing.reduction + "%");
      console.log("      Actif:", existing.actif ? "✅ OUI" : "❌ NON");

      // Mettre à jour si inactif
      if (!existing.actif) {
        console.log("\n3️⃣ Activation du code...");
        await mongoose.connection.db
          .collection("codereductions")
          .updateOne({ code: "OUMA98" }, { $set: { actif: true } });
        console.log("   ✅ Code activé !");
      } else {
        console.log("\n   ✅ Le code est déjà actif, rien à faire !");
      }
    } else {
      console.log("   ℹ️  Le code n'existe pas encore");
      console.log("\n3️⃣ Création du code OUMA98...");

      // Créer le code
      await mongoose.connection.db.collection("codereductions").insertOne({
        code: "OUMA98",
        reduction: 10,
        actif: true,
      });

      console.log("   ✅ Code OUMA98 créé avec succès !");
      console.log("\n   📊 Détails :");
      console.log("      Code: OUMA98");
      console.log("      Réduction: 10%");
      console.log("      Actif: ✅ OUI");
    }

    console.log("\n" + "─".repeat(50));
    console.log("✅ OPÉRATION TERMINÉE AVEC SUCCÈS !");
    console.log("─".repeat(50) + "\n");

    await mongoose.connection.close();
  } catch (error) {
    console.error("\n❌ ERREUR:", error.message);
    console.error("\nStack:", error.stack);
    process.exit(1);
  }
};

addPromoToProduction();
