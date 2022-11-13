const express = require("express");
const router = express.Router();
const newscontroller = require("../controller/news");

/* GET home page. */
router.get("/", newscontroller.getallnews);
router.get("/news/:id", newscontroller.getsinglenews);

router.get("/add-news", newscontroller.getpublishnews);
router.post("/add-news", newscontroller.postpublishnews);

router.get("/contact", newscontroller.getcontact);

module.exports = router;
