const express = require("express");
const cors = require("cors");
const app = express();

// Configuration CORS
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:3003",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Route de test simple
app.get("/", (req, res) => {
  res.json({ message: "Serveur backend fonctionne !" });
});

// Route de test pour l'authentification
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Tentative de connexion:", { email, password });

  // Pour le test, on accepte n'importe quelle connexion
  res.json({
    message: "Test de connexion réussi",
    user: { email, role: "admin" },
    tokens: "test_token",
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Serveur de test démarré sur http://localhost:${PORT}`);
  console.log("📝 Routes disponibles:");
  console.log("   GET  / - Test de base");
  console.log("   POST /auth/login - Test de connexion");
});
