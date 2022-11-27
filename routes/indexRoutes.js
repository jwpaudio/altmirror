//Router for all the main pages
const express = require("express");
const userController = require("../controllers/userController");
const viewsController = require("../controllers/viewsController");
const router = express("router");

router.route("/").get(viewsController.getIndexPage);
router.route("/login").get(viewsController.getLoginPage);
router.route("/signup").get(viewsController.getSignUpPage);
router.route("/signupsuccess").get(viewsController.getSignUpSuccessPage);
router
  .route("/changepasssuccess")
  .get(viewsController.getChangePassSuccessPage);
router
  .route("/deleteaccountsuccess")
  .get(viewsController.getDeleteAccountSuccessPage);
router.route("/signout").get(viewsController.getSignoutPage);
router.route("/forgotpass").get(viewsController.getForgotPassPage);
router
  .route("/dashboard")
  .get(userController.loginRequired, viewsController.getDashboard);

router.route("/mirror").get(viewsController.getMirror);

module.exports = router;
