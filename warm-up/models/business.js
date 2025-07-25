const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  companyName: String,
  businessItem: String,
  problem: String,
  solution: String,
  targetMarket: String,
  competitiveAdvantage: String,
  businessStage: String,
  desiredInvestment: String,
  industry: [String],
});

module.exports = mongoose.model("Business", BusinessSchema);
