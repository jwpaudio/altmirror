//Models for each of the module properties

//Imports
const mongoose = require("mongoose");

const clockPropertiesSchema = new mongoose.Schema({
  digital: {
    type: Boolean,
    default: true,
    required: false,
  },
  military: {
    type: Boolean,
    default: false,
    required: false,
  },
  color: {
    type: String,
    minlength: 6,
    maxlength: 6,
    default: "ffffff",
    required: false,
  },
});

const greetingPropertiesSchema = new mongoose.Schema({
  color: {
    type: String,
    minlength: 6,
    maxlength: 6,
    default: "ffffff",
    required: false,
  },
  pulseAnimate: {
    type: Boolean,
    default: true,
    required: false,
  },
});

module.exports = mongoose.model("Clock", clockPropertiesSchema);
module.exports = mongoose.model("Greeting", greetingPropertiesSchema);
