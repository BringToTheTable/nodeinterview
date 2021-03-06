

const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();



router.get("/signout", auth(), userController.signOut);

router.get(
  "/profile",

  auth(),

  validate(userValidation.getUser),
  userController.getUser
);


// Supports updating address only currently

module.exports = router;
