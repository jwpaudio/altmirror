//Doc to define user routes
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//User routes
router.route("/signup").post(userController.signup);
router.route("/signin").post(userController.signin);
router.route("/forgotpass").post(userController.forgotpass);
router.route("/signout").get(userController.signout);
router.route("/changepass").post(userController.changePassword);
router.route("/delete").post(userController.deleteAccount);

module.exports = router;
