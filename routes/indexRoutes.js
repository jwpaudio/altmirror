//Router for all the main pages
const express = require("express");
const userController = require("../controllers/userController");
const viewsController = require("../controllers/viewsController");
const router = express("router");

router
  .route("/dashboard")
  .get(userController.loginRequired, viewsController.getDashboard);

router.route("/mirror").get(viewsController.getMirror);

module.exports = router;
