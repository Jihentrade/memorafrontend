// models/CodeReduction.js
const mongoose = require('mongoose');

const codeReductionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  reduction: { type: Number, required: true }, 
  actif: { type: Boolean, default: true }
});

module.exports = mongoose.model('CodeReduction', codeReductionSchema);