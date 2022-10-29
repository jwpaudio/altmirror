//Model for our user

//Imports
const mongoose = require("mongoose");

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
  mirrorID: {
    type: mongoose.Types.ObjectId,
    ref: "Mirror",
  },
  createdDate: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
});

//Export model
module.exports = mongoose.model("User", userSchema);
