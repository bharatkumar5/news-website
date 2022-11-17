const express = require("express");
const router = express.Router();
const newscontroller = require("../controller/news");

/* GET home page. */
router.get("/", newscontroller.getallnews);
router.get("/news/:id", newscontroller.getsinglenews);

router.get("/add-news", newscontroller.getpublishnews);
router.post("/add-news", newscontroller.postpublishnews);
router.get("/About", newscontroller.getabout);
router.get("/contact", newscontroller.getcontact);
router.get("/Business", newscontroller.getbusiness);
router.get("/Entertainment", newscontroller.getentertainment);
router.get("/health", newscontroller.gethealth);
router.get("/other", newscontroller.getother);

router.get("/politics", newscontroller.getPolitics);
router.get("/Sports", newscontroller.getsports);
router.get("/technology", newscontroller.gettechnology);

module.exports = router;
