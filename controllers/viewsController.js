//Imports
const User = require("../models/userModel");
const Mirror = require("../models/mirrorModel");

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

exports.getSignUpSuccessPage = (req, res) => {
  res.render("login", { message: "Signed Up! Please Log In" });
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
    const thisMirror = thisUser.mirrorID;
    return res.render("dashboard", {
      user: thisUser,
      mirror: thisMirror,
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
    const thisMirror = thisUser.mirrorID;
    return res.render("mirror", {
      user: thisUser,
      mirror: thisMirror,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/dashboard");
  }
};

exports.getMirrorWithID = async (req, res) => {
  try {
    const thisMirror = await Mirror.findById(req.params.id);
    return res.render("mirror", {
      mirror: thisMirror,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/dashboard");
  }
};
