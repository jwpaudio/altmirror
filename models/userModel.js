//Model for our user

//Imports
const mongoose = require("mongoose");
const uuid = require("uuid");

//Create user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already in use"],
    index: true,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
  },
  mirrorId: {
    type: String,
    required: true,
    default: uuid.v4(),
    immutable: true,
  },
  createdDate: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
});

//Export model
module.exports = mongoose.model("User", userSchema);
