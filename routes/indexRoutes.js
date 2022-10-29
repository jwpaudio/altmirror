//Router for all the main pages
const express = require("express");
const userController = require("../controllers/userController");
const User = require("../models/userModel");
const router = express("router");

router
  .route("/dashboard")
  .get(userController.loginRequired, async (req, res) => {
    try {
      const thisUser = await User.findOne()
        .where("email")
        .equals(req.user.email)
        .populate("mirrorID");
      res.render("dashboard", thisUser);
    } catch (err) {
      console.log(err);
      res.render("dashboard", { email: "No Account Found" });
    }
  });

router.route("/mirror").get((req, res) => {
  res.render("mirror");
});

module.exports = router;
