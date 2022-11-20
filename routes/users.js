var express = require("express");
var router = express.Router();
const usercontroller = require("../controller/user");

/* GET users listing. */
router.get("/signup", usercontroller.getsignup);
router.get("/login", usercontroller.getlogin);

module.exports = router;
