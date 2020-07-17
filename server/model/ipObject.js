const mongoose = require("mongoose");

const banSchema = new mongoose.Schema({
  ips: {
    type: Object,
    required: true,
  },
});

const Ban = mongoose.model("Ban", banSchema);
module.exports = { Ban };
