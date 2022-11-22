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
    enum: ["clock", "greeting", "none"],
  },
  position2: {
    type: String,
    default: "none",
    enum: ["clock", "greeting", "none"],
  },
  position3: {
    type: String,
    default: "none",
    enum: ["clock", "greeting", "none"],
  },
  position4: {
    type: String,
    default: "none",
    enum: ["clock", "greeting", "none"],
  },
  position5: {
    type: String,
    default: "none",
    enum: ["clock", "greeting", "none"],
  },
  position6: {
    type: String,
    default: "none",
    enum: ["clock", "greeting", "none"],
  },
  position7: {
    type: String,
    default: "none",
    enum: ["clock", "greeting", "none"],
  },
  position8: {
    type: String,
    default: "none",
    enum: ["clock", "greeting", "none"],
  },
});

//Calculated property for the positions taken
// mirrorSchema.virtual("positionsTaken").get(function () {
//   const positionsTaken = [];
//   const modules = this.moduleIDs;

//   modules.forEach(async function (module) {
//     let thisModule = await Module.findById({ id: module.id });
//     positionsTaken.push(thisModule.id);
//   });

//   return positionsTaken;
// });

module.exports = mongoose.model("Mirror", mirrorSchema);
