//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebaseAdmin = require("firebase-admin");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

//EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

//App Use
app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

//Middleware to check for token
app.use(async function (req, res, next) {
  if (req.cookies.access_token) {
    try {
      req.user = await firebaseAdmin
        .auth()
        .verifyIdToken(req.cookies.access_token);
      next();
    } catch (err) {
      req.user = undefined;
      next();
    }
  } else {
    req.user = undefined;
    next();
  }
});

//Import routers
const indexRouter = require("./routes/indexRoutes");
const userRouter = require("./routes/userRoutes");
const mirrorRouter = require("./routes/mirrorRoutes");

//Use routers
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/mirrors", mirrorRouter);

module.exports = app;
