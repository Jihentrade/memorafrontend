const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  cin: {
    type: String,
    required: false,
  },
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
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function ValidateEmail(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "email is invalid",
    },
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("adminmodel", userSchema);
