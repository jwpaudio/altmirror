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
    res.render("login", { title: "Login" });
  }
};

//Signout method
exports.getSignoutPage = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .render("login", { message: "Successfully Signed Out", title: "Login" });
};

exports.getSignUpPage = (req, res) => {
  res.render("signup", { title: "Signup" });
};

exports.getSignUpSuccessPage = (req, res) => {
  res.render("login", { message: "Signed Up! Please Log In", title: "Login" });
};

exports.getChangePassSuccessPage = (req, res) => {
  res.render("login", {
    message:
      "Successfully changed password. Please log in with new credentials.",
    title: "Login",
  });
};

exports.getDeleteAccountSuccessPage = (req, res) => {
  res.render("login", {
    message: "Successfully deleted account.",
    title: "Login",
  });
};

exports.getForgotPassPage = (req, res) => {
  res.render("forgotpass", { title: "Forgot Password" });
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
      title: "User Dashboard",
    });
  } catch (err) {
    console.log(err);
    return res.render("dashboard", {
      user: { email: "No Account Found" },
      title: "User Dashboard",
    });
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
      title: "Mirror",
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
      title: "Mirror",
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/dashboard");
  }
};
