var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET hello - Route de test/santé */
router.get("/hello", function (req, res) {
  console.log("✅ Route /hello appelée");
  res.status(200).json({
    message: "Hello from Memora Magnet Backend!",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
