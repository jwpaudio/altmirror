//Models for each of the module properties

//Imports
const mongoose = require("mongoose");

const clockPropertiesSchema = new mongoose.Schema({
  digital: {
    type: Boolean,
    default: true,
    required: true,
  },
  military: {
    type: Boolean,
    default: false,
    required: true,
  },
  color: {
    type: String,
    minlength: 6,
    maxlength: 6,
    default: "ffffff",
    required: true,
  },
});

const greetingPropertiesSchema = new mongoose.Schema({
  color: {
    type: String,
    minlength: 6,
    maxlength: 6,
    default: "ffffff",
    required: true,
  },
  pulseAnimate: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = mongoose.model("Clock", clockPropertiesSchema);
module.exports = mongoose.model("Greeting", greetingPropertiesSchema);
