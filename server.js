//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//This import lets us work with the local file system
const fs = require("fs");
//This import lets us join file paths easily
const path = require("path");

//Starts our server and listens on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//Makes the entire public folder
app.use(express.static(__dirname + "/public"));
//Sends the user to the login html file when they use the /login url
app.use("/login", express.static(__dirname + "/public/html/login/login.html"));
app.use(
  "/login/success",
  express.static(__dirname + "/public/html/login/loginsuccess.html")
);
//Automatically parses any JSON sent to the server from any client
app.use(bodyParser.json());

//Our authentication fetch request
app.post("/authentication", (req, res) => {
  //Load the authenticated users JSON file into an object variable
  const authenticatedUsers = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        "/controller/authentication/authenticated_users.json"
      )
    )
  );

  //Load the sent username and password into variables
  const clientUsername = req.body.username;
  const clientPassword = req.body.password;

  //Loop through the authenticated users to see if any username and password matches
  let authenticated = false;
  for (const user of authenticatedUsers.users) {
    if (clientUsername === user.username && clientPassword === user.password) {
      authenticated = true;
    }

    //Check to see if authenticated and send appropriate response
    if (authenticated) {
      return res.status(200).json({ authenticated: "yes" });
    } else {
      return res.status(401).json({ authenticated: "no" });
    }
  }
});
