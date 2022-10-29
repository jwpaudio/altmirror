//Doc to define user routes
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//User pages

router
  .route("/signup")
  .get(userController.getSignUpPage)
  .post(userController.signup);
router
  .route("/signin")
  .get(userController.getSignInpage)
  .post(userController.signin);
router
  .route("/forgotpass")
  .get(userController.getForgotPassPage)
  .post(userController.forgotpass);
router.route("/signout").get(userController.signout);

module.exports = router;
