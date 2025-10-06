const jwt = require("jsonwebtoken");
const moment = require("moment");
const { Token } = require("../models/token");
//const { ApiError } = require('../utils');
const Admin = require("../models/adminmodel");

const generateToken = (idAdmin, expires, secret = config.jwt.secret) => {
  const payload = {
    sub: idAdmin,
    iat: moment().unix(),

    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (admin) => {
  console.log("adminnnnnnnn", admin);
  const accessTokenExpires = moment().add(30, "minutes");
  const accessToken = generateToken(admin.id, accessTokenExpires);

  const refreshTokenExpires = moment().add(7, "days");

  const refreshToken = generateToken(admin.id, refreshTokenExpires);

  await Token.create({
    token: refreshToken,
    user: admin.id,
    expires: refreshTokenExpires.toDate(),
    type: "refresh",
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const refreshAuthTokens = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: "refresh",
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new Error("Refresh token not found");
  }

  const admin = await Admin.findById(refreshTokenDoc.admin);
  if (!admin) {
    throw new Error("Admin not found");
  }

  await refreshTokenDoc.remove();

  const tokens = await generateAuthTokens(admin);

  return tokens;
};

module.exports = {
  generateAuthTokens,
  refreshAuthTokens,
};
