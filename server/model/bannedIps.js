const mongoose = require("mongoose");

const bannedSchema = new mongoose.Schema({
  banned: {
    type: Array,
    required: true,
  },
});

const BannedItems = mongoose.model("Banned", bannedSchema);
module.exports = { BannedItems };

// { banned: [timeOfBan, timeOfBan....]}
