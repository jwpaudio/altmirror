//Model for our mirror

//Imports
const mongoose = require("mongoose");

const mirrorSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdDate: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
  position1: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
  position2: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
  position3: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
  position4: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
  position5: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
  position6: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
  position7: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
  position8: {
    type: String,
    default: "none",
    enum: [
      "clock",
      "greeting",
      "calendar",
      "weather",
      "todayinhistory",
      "diagnostics",
      "xmascountdown",
      "nflschedule",
      "none",
    ],
  },
});

module.exports = mongoose.model("Mirror", mirrorSchema);
