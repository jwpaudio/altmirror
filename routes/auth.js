//---API FOR AUTH WITH FIREBASE---//

//General imports
const express = require("express");
const router = express.Router();
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} = require("firebase/auth");

//Firebase sign in
router.post("/signin", (req, res) => {
  //Load the sent email and password into variables
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;

  //Send username and password to firebase
  const auth = getAuth();
  signInWithEmailAndPassword(auth, clientEmail, clientPassword)
    .then(() => {
      console.log("Authenticated with firebase");
      return res.status(200).json({ authenticated: "yes" });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(401).json({ authenticated: "no" });
    });
});

//Firebase sign up
router.post("/signup", (req, res) => {
  //Load the sent new user information into variables
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;

  //Send new user info to firebase
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, clientEmail, clientPassword)
    .then((response) => {
      console.log(`Firebase response: ${response}`);
      return res.status(201).json({ userCreated: "yes" });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(400).json({ userCreated: "no" });
    });
});

//Firebase forgot password
router.post("/forgotpass", (req, res) => {
  //Load the sent email information
  const clientEmail = req.body.email;

  //Send entered email to firebase
  const auth = getAuth();
  sendPasswordResetEmail(auth, clientEmail)
    .then((response) => {
      console.log(`Firebase response: ${response}`);
      return res.status(200).json({ emailSent: "yes" });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(404).json({ emailSent: "no" });
    });
});

//Export routes
module.exports = router;
