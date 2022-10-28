//Imports
const app = require("./app");

//This import lets us work with the firebase sdk
const firebaseConfig = require("./controllers/firebaseController");

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

//Start with firebase config
firebaseConfig.initializeFirebaseAdmin();
firebaseConfig.initializeFirebaseSDK();
