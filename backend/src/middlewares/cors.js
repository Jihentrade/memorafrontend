const cors = require("cors");

// Configuration CORS pour le développement
const corsOptions = {
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origin (ex: Postman, applications mobiles)
    if (!origin) return callback(null, true);

    // Liste des origines autorisées
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://localhost:3000/",
      "http://localhost:3001/",
      "https://memoramagnetfinaaal.vercel.app",
      "https://memoramagnetfinaaal.vercel.app/",
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS: Origin non autorisé:", origin);
      callback(null, true); // Autoriser temporairement pour le développement
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Cache-Control",
    "Pragma",
    "X-CSRF-Token",
  ],
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

module.exports = cors(corsOptions);
