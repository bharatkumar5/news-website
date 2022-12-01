const express = require("express");
const router = express.Router();
const { body, check } = require("express-validator");
const usercontroller = require("../controller/user");

/* GET users listing. */
router.get("/signup", usercontroller.getsignup);
router.post(
  "/signup",
  check("email").isEmail().withMessage("please enter valid email"),
  body("password", "password should be atleast 6 charecter")
    .isLength({ min: 6 })
    .trim(),
  body("confirmpassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password have to match");
      }
      return true;
    }),
  usercontroller.postsignup
);

router.get("/login", usercontroller.getlogin);
router.post("/login", usercontroller.postlogin);
router.post("/logout", usercontroller.postlogout);
router.get("/reset", usercontroller.getreset);

module.exports = router;
