//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//This import lets us work with the local file system
const fs = require("fs");
//This import lets us join file paths easily
const path = require("path");
//This import lets us work with the firebase sdk
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Starts our server and listens on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//Database login
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Couldn't connect to the DB");
    console.log(`Error: ${error}`);
  });

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1eEw3r1txckvPHBuKZ7XT10TBGLWxS7w",
  authDomain: "altmirror-3c3fa.firebaseapp.com",
  projectId: "altmirror-3c3fa",
  storageBucket: "altmirror-3c3fa.appspot.com",
  messagingSenderId: "530870603047",
  appId: "1:530870603047:web:dcb18ecd50ec7bff48ad02",
  measurementId: "G-LM2P7YD5RK",
};
//Start with firebase config
const firebaseApp = initializeApp(firebaseConfig);

//Makes the entire public folder
app.use(express.static(__dirname + "/public"));
//Sends the user to the login html file when they use the /login url
app.use("/login", express.static(__dirname + "/public/html/login/login.html"));
app.use(
  "/signup",
  express.static(__dirname + "/public/html/login/signup.html")
);
app.use(
  "/login/success",
  express.static(__dirname + "/public/html/login/loginsuccess.html")
);
app.use(
  "/mirror",
  express.static(__dirname + "/public/html/mirror/mirror.html")
);

//Redirect home page to login for now
app.get("/", (req, res) => {
  res.redirect("/login");
});

//Automatically parses any JSON sent to the server from any client
app.use(bodyParser.json());

//Our authentication fetch request
app.post("/authentication", (req, res) => {
  //Load the sent username and password into variables
  const clientUsername = req.body.username;
  const clientPassword = req.body.password;

  //Send username and password to firebase
  const auth = getAuth();
  signInWithEmailAndPassword(auth, clientUsername, clientPassword)
    .then(() => {
      console.log("Authenticated with firebase");
      return res.status(200).json({ authenticated: "yes" });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(401).json({ authenticated: "no" });
    });
});
