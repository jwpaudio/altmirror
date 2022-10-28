//All the methods we will want to perform regarding users

//Imports
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} = require("firebase/auth");
const User = require("../models/userModel");

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

    res.status(200).json({
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

//Require user login to view resource attached
exports.loginRequired = () => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized user!",
    });
  }
};
