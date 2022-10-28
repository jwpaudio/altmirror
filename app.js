//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebaseAdmin = require("firebase-admin");

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
app.use(
  "/forgotpass",
  express.static(__dirname + "/public/html/login/ForgotPassword.html")
);

//Redirect home page to login for now
app.get("/", (req, res) => {
  res.redirect("/login");
});

//Automatically parses any JSON sent to the server from any client
app.use(bodyParser.json());

//Middleware to check for token
app.use(async function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      req.user = await firebaseAdmin
        .auth()
        .verifyIdToken(req.headers.authorization.split(" ")[1]);
      console.log(req.user);
      next();
    } catch (err) {
      console.log(err);
      req.user = undefined;
      next();
    }
  } else {
    req.user = undefined;
    next();
  }
});

//Import routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/userRoutes");

//Use routers
app.use("/auth", authRouter);
app.use("/users", userRouter);

module.exports = app;
