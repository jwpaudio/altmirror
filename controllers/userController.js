//All the methods we will want to perform regarding users

//Imports
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} = require("firebase/auth");
const User = require("../models/userModel");
const mirrorController = require("../controllers/mirrorController");

//Render user pages
exports.getSignInpage = (req, res) => {
  res.render("users/signin");
};
exports.getSignUpPage = (req, res) => {
  res.render("users/signup");
};
exports.getForgotPassPage = (req, res) => {
  res.render("users/forgotpass");
};

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
  res.clearCookie("access_token").status(200).redirect("/users/signin");
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
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.render("users/signin", { message: "Session Expired" });
  }
};
