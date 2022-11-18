//Imports
const User = require("../models/userModel");
const Mirror = require("../models/mirrorModel");
const Module = require("../models/moduleModel");

exports.getDashboard = async (req, res) => {
  try {
    const thisUser = await User.findOne()
      .where("email")
      .equals(req.user.email)
      .populate("mirrorID");
    const thisMirror = await Mirror.findOne()
      .where("id")
      .equals(thisUser.mirrorID.id)
      .populate("moduleIDs");
    let theseModules = [
      { moduleType: "Clock", position: 1 },
      { moduleType: "Greeting", position: 2 },
      { moduleType: "Clock", position: 5 },
      { moduleType: "Greeting", position: 8 },
    ];
    // if (thisMirror.moduleIDs.length > 0) {
    //   theseModules = await Module.find()
    //     .where("mirrorID")
    //     .equals(thisMirror.id)
    //     .populate("propertiesID");
    // }
    return res.render("dashboard", {
      user: thisUser,
      mirror: thisMirror,
      modules: theseModules,
    });
  } catch (err) {
    console.log(err);
    return res.render("dashboard", { user: { email: "No Account Found" } });
  }
};

exports.getMirror = async (req, res) => {
  return res.render("mirror");
};
