const express = require("express");
const router = express.Router();
const newscontroller = require("../controller/news");
const isauth = require("../middleware/isauth");

/* GET home page. */
router.get("/", newscontroller.getallnews);
router.get("/news/:id?", newscontroller.getsinglenews);
//Creating post //
router.get("/add-news", isauth, newscontroller.getpublishnews);
router.post("/add-news", isauth, newscontroller.postpublishnews);

///rendering by section//
router.get("/About", newscontroller.getabout);
router.get("/contact", newscontroller.getcontact);
router.get("/Business", newscontroller.getbusiness);
router.get("/Entertainment", newscontroller.getentertainment);
router.get("/health", newscontroller.gethealth);
router.get("/other", newscontroller.getother);

router.get("/politics", newscontroller.getPolitics);
router.get("/Sports", newscontroller.getsports);
router.get("/technology", newscontroller.gettechnology);
//editing and update///
router.get("/edit-news/:newsid", isauth, newscontroller.getedit);
router.post("/edit-news", isauth, newscontroller.postedit);
router.post("/delete-news", isauth, newscontroller.Postdelete);
//comment //
router.post("/addcomment", isauth, newscontroller.postcomment);

module.exports = router;
