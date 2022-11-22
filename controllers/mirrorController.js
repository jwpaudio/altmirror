//Imports
const Mirror = require("../models/mirrorModel");
const User = require("../models/userModel");

exports.createMirror = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newMirror = await Mirror.create({
        userID: userID,
      });
      resolve(newMirror.id);
    } catch (err) {
      reject(err);
    }
  });
};

//Add modules to mirror
exports.addModules = async (req, res) => {
  try {
    const newModules = req.body.modules;
    const thisUser = await User.findOne({ email: req.user.email });
    const thisUserMirror = await Mirror.findById(thisUser.mirrorID);

    for (let i = 1; i <= 8; i++) {
      thisUserMirror[`position${i}`] = newModules[`position${i}`];
    }

    await thisUserMirror.save();

    res.status(200).json({ status: "success", message: "Saved" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ status: "fail", message: "err" });
  }
};
