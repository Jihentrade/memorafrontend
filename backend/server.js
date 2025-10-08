#!/usr/bin/env node
/**
 * Serveur de développement simplifié
 * Usage: node server.js
 */

require("dotenv").config();
const app = require("./app");
const http = require("http");

// Port de développement
const PORT = process.env.PORT || 4001;

// Créer le serveur HTTP
const server = http.createServer(app);

// Démarrer le serveur
server.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log("🚀 Serveur backend démarré avec succès !");
  console.log("=".repeat(50));
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `📊 MongoDB: ${
      process.env.MONGODB_URL ? "✅ Configuré" : "❌ Non configuré"
    }`
  );
  console.log("=".repeat(50) + "\n");

  console.log("Routes disponibles:");
  console.log("  POST   /client/verifyPromoCode");
  console.log("  POST   /client/createClient");
  console.log("  GET    /client/findAll");
  console.log("  ...");
  console.log("\n👉 Testez avec: node testPromoCode.js\n");
});

// Gestion des erreurs
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`❌ Le port ${PORT} nécessite des privilèges élevés`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`❌ Le port ${PORT} est déjà utilisé`);
      console.error(
        `💡 Solution: Arrêtez l'autre processus ou utilisez un autre port`
      );
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Gestion de l'arrêt propre
process.on("SIGINT", () => {
  console.log("\n\n👋 Arrêt du serveur...");
  server.close(() => {
    console.log("✅ Serveur arrêté proprement");
    process.exit(0);
  });
});
