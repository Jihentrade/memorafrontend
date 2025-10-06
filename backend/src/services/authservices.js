const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/adminmodel");
//***************************************************************************** */
async function loginUserWithEmailAndPassword(email, password) {
  try {
    console.log("Tentative de connexion pour:", email);

    // Vérifier si MongoDB est connecté
    if (!User.db || !User.db.db) {
      console.log("⚠️  Mode test sans base de données");

      // Utilisateur de test
      if (email === "admin@test.com" && password === "test123") {
        const payload = { userID: "test_user_id" };
        const token = jwt.sign(payload, process.env.SECRET || "test_secret");

        return {
          user: {
            _id: "test_user_id",
            email: email,
            name: "Admin Test",
            lastname: "User",
            role: "admin",
          },
          tokens: token,
        };
      } else {
        throw new Error("Email ou mot de passe incorrect");
      }
    }

    // Mode normal avec base de données
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const payload = { userID: user._id };
    const token = jwt.sign(payload, process.env.SECRET);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect email or password");
    }

    return { user, tokens: token };
  } catch (err) {
    throw new Error(err.message);
  }
}
module.exports = {
  loginUserWithEmailAndPassword,
};
