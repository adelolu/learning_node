const express = require("express");
const router = express.Router();
const { uservalidation } = require("../middleware/uservalidation");
const { validate } = require("../middleware/validator");
const {
  Signup,
  Login,
  verifydashboard,
  UploadProfile,
} = require("../controllers/usercontroller");

// function route
router.post("/signup", validate(uservalidation), Signup);
router.post("/login", Login);
router.get("/verifydashboard", verifydashboard);
router.post("/dashboard", UploadProfile);

module.exports = router;
