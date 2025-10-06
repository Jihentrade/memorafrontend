const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Serveur simple fonctionne !" });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });

  if (email === "admin@test.com" && password === "test123") {
    res.json({
      user: { email, role: "admin" },
      tokens: "test_token_123",
    });
  } else {
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`✅ Serveur simple démarré sur http://localhost:${PORT}`);
  console.log("📝 Test avec: admin@test.com / test123");
});
