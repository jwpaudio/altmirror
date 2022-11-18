//Imports
const User = require("../models/userModel");
const Mirror = require("../models/mirrorModel");
const Module = require("../models/moduleModel");

exports.getIndexPage = (req, res) => {
  res.redirect("/login");
};

exports.getLoginPage = (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
};
exports.getSignUpPage = (req, res) => {
  res.render("signup");
};

exports.getForgotPassPage = (req, res) => {
  res.render("forgotpass");
};

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
      { moduleType: "clock", position: 1 },
      { moduleType: "greeting", position: 2 },
      { moduleType: "clock", position: 5 },
      { moduleType: "greeting", position: 8 },
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
      { moduleType: "clock", position: 1 },
      { moduleType: "greeting", position: 2 },
      { moduleType: "clock", position: 5 },
      { moduleType: "greeting", position: 8 },
    ];
    // if (thisMirror.moduleIDs.length > 0) {
    //   theseModules = await Module.find()
    //     .where("mirrorID")
    //     .equals(thisMirror.id)
    //     .populate("propertiesID");
    // }
    return res.render("mirror", {
      user: thisUser,
      mirror: thisMirror,
      modules: theseModules,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/dashboard");
  }
};
