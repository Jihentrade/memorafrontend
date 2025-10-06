const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    unique: false,
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("clientmodel", userSchema);
