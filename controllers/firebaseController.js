//All firebase config methods

//Imports
const firebaseSDK = require("firebase/app");
const firebaseAdmin = require("firebase-admin");

//Credentials for firebase admin
firebaseServiceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);

exports.initializeFirebaseSDK = () => {
  try {
    firebaseSDK.initializeApp(JSON.parse(process.env.FIREBASE_SDK_CONFIG));
  } catch (err) {
    console.log(err);
  }
};

exports.initializeFirebaseAdmin = () => {
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    });
  } catch (err) {
    console.log(err);
  }
};
