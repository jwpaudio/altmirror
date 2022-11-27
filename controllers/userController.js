//All the methods we will want to perform regarding users

//Imports
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
} = require("firebase/auth");
const User = require("../models/userModel");
const Mirror = require("../models/mirrorModel");
const mirrorController = require("../controllers/mirrorController");

//Sign in method
exports.signin = async (req, res) => {
  try {
    const clientEmail = req.body.email;
    const clientPassword = req.body.password;
    const firebaseAuth = getAuth();

    const mongoUser = await User.findOne({ email: req.body.email });

    const firebaseResponse = await signInWithEmailAndPassword(
      firebaseAuth,
      clientEmail,
      clientPassword
    );

    res
      .cookie(
        "access_token",
        firebaseResponse.user.stsTokenManager.accessToken,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        }
      )
      .status(200)
      .json({
        status: "success",
        message: {
          email: firebaseResponse.user.email,
          mirrorId: mongoUser.mirrorId,
          token: firebaseResponse.user.stsTokenManager.accessToken,
          refreshToken: firebaseResponse.user.stsTokenManager.refreshToken,
        },
      });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//Signup method
exports.signup = async (req, res) => {
  try {
    const newEmail = req.body.email;
    const newPassword = req.body.password;
    const firebaseAuth = getAuth();

    let newMongoUser = await User.create({ email: newEmail });

    let newMongoMirrorID = await mirrorController.createMirror(newMongoUser.id);

    newMongoUser = await User.findById(newMongoUser.id);

    newMongoUser.mirrorID = newMongoMirrorID;
    await newMongoUser.save();

    let newFirebaseUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      newEmail,
      newPassword
    );

    res.status(201).json({
      status: "succcess",
      message: {
        email: newFirebaseUser.user.email,
        mirrorId: newMongoUser.mirrorId,
        token: newFirebaseUser.user.stsTokenManager.accessToken,
        refreshToken: newFirebaseUser.user.stsTokenManager.refreshToken,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//Signout method
exports.signout = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ status: "success", message: "Successfully signed out." });
};

//Forgotpass method
exports.forgotpass = async (req, res) => {
  try {
    const clientEmail = req.body.email;
    const firebaseAuth = getAuth();

    const firebaseResponse = await sendPasswordResetEmail(
      firebaseAuth,
      clientEmail
    );

    res.status(200).json({
      status: "success",
      message: firebaseResponse,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const clientEmail = req.user.email;
    const firebaseAuth = getAuth();

    //Get user by signing in (doubles as checking old password)
    await signInWithEmailAndPassword(firebaseAuth, clientEmail, oldPassword);

    const thisUser = firebaseAuth.currentUser;

    //Change password
    await updatePassword(thisUser, newPassword);

    res.clearCookie("access_token").status(200).json({
      status: "success",
      message: "Successfully updated password.",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: "Password update failed. Please try again.",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    //Info from request
    const clientEmail = req.user.email;
    const clientPassword = req.body.password;
    const thisMongoUser = await User.findOne({ email: clientEmail }).populate(
      "mirrorID"
    );

    //Delete user from firebase
    const firebaseAuth = getAuth();

    //Get user by signing in
    await signInWithEmailAndPassword(firebaseAuth, clientEmail, clientPassword);
    const thisFirebaseUser = firebaseAuth.currentUser;

    //Delete account
    await deleteUser(thisFirebaseUser);

    //Delete user mirror
    await Mirror.findByIdAndDelete(thisMongoUser.mirrorID.id);

    //Delete user MongoDB account
    await User.findByIdAndDelete(thisMongoUser.id);

    //Clear token and send confirmation status
    res
      .clearCookie("access_token")
      .status(200)
      .json({ status: "success", message: "Account successfully deleted." });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: "Delete account failed. Please try again.",
    });
  }
};

//Require user login to view resource attached
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.render("login", { message: "Session Expired", title: "Login" });
  }
};
