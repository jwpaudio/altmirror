//Model for our module type

//Imports
const mongoose = require("mongoose");

const moduleModel = new mongoose.Schema({
  mirrorID: {
    type: mongoose.Types.ObjectId,
    ref: "Mirror",
    required: true,
  },
  moduleType: {
    type: String,
    enum: ["Clock", "Greeting"],
    required: true,
  },
  propertiesID: {
    type: mongoose.Types.ObjectId,
    refPath: "moduleType",
  },
  position: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8],
  },
});

module.exports = mongoose.model("Module", moduleModel);
