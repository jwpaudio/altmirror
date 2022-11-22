//Router for all the main pages
const express = require("express");
const mirrorController = require("../controllers/mirrorController");
const userController = require("../controllers/userController");
const viewsController = require("../controllers/viewsController");
const router = express("router");

router
  .route("/addmodules")
  .post(userController.loginRequired, mirrorController.addModules);
router.route("/:id").get(viewsController.getMirrorWithID);

module.exports = router;
