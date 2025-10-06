//const user = require('../models/userModel');
const authService = require("../services/authservices");
const tokenService = require("../services/tokenServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
//**************************************************************************** */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: "email et/ou mot de passe incorrect(s) " });
  }
  // const tokens = await tokenService.generateAuthTokens(user);
});
//************************************************ */ userController.js
const logout = catchAsync(async (req, res) => {
  res.clearCookie("session");
  res.status(200).send({ message: "Déconnexion réussie" });
});
//******************************************************************** */
const getAuthUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  logout,
  getAuthUser,
};
