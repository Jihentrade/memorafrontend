const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["access", "refresh"],
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.methods.isExpired = function () {
  return Date.now() >= this.expires.getTime();
};

tokenSchema.methods.isActive = function () {
  return !this.blacklisted && !this.isExpired();
};

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
