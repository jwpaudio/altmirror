//Model for our mirror

//Imports
const mongoose = require("mongoose");
const Module = require("./moduleModel");

const mirrorSchema = new mongoose.Schema({
  moduleIDs: {
    type: [mongoose.Types.ObjectId],
    ref: "Module",
  },
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
