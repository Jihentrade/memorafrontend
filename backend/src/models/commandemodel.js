const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  number: { type: Number, required: true, default: 0 },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clientmodel",
    required: true,
  },
  numeroCommande: {
    type: String,
    default: function () {
      const now = new Date();
      const year = now.getFullYear();
      let month = (now.getMonth() + 1).toString().padStart(2, "0");
      return `${year}-${month}${this.incrementValue}`;
    },
  },
  dateCommande: { type: Date, default: Date.now },
  images: {
    type: [String],
    required: false,
    default: [],
  },
  montantTotal: { type: Number, default: 0 },
  modePayement: { type: String, default: "en_attente" },
});

module.exports = mongoose.model("commandemodel", userSchema);
