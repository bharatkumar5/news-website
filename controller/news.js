const { render } = require("ejs");
const News = require("../modal/news");

exports.getallnews = (req, res, next) => {
  News.find()
    .then((doc) => {
      const tech = doc.filter((el) => {
        if (el.category === "Technology") {
          return el;
        }
      });

      const Sport = doc.filter((el) => {
        if (el.category === "Sports") {
          return el;
        }
      });

      const Business = doc.filter((el) => {
        if (el.category === "Business") {
          return el;
        }
      });

      const Entertainment = doc.filter((el) => {
        if (el.category === "Entertainment") {
          return el;
        }
      });

      res.render("index.ejs", {
        title: "express",
        news: doc,
        tech: tech,
        sport: Sport,
        Business: Business,
        Entertainment: Entertainment,
      });
    })
    .catch((err) => console.log(err));
};

exports.getsinglenews = (req, res, next) => {
  const id = req.params.id;

  News.findById(id)
    .then((doc) => {
      res.render("singlenews.ejs", { title: "single news", news: doc });
    })
    .catch((err) => console.log(err));

  // res.render("singlenews.ejs", { title: "single news" });
};

exports.getpublishnews = (req, res, next) => {
  res.render("form.ejs", { title: "publish news" });
};

exports.postpublishnews = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const category = req.body.category;
  const content = req.body.content;

  // const news = new News({
  //   title: title,
  //   image: image,
  //   category: category,
  //   content: content,
  // });

  News.create({
    title: title,
    image: image,
    category: category,
    content: content,
  })
    .then((doc) => {})
    .catch((err) => console.log("error"));

  res.redirect("/");
};

exports.getbusiness = (req, res, next) => {
  res.render("newslist.ejs", { title: "Business" });
};

exports.getentertainment = (req, res, next) => {
  res.render("newslist.ejs", { title: "Entertainment" });
};

exports.getsports = (req, res, next) => {
  res.render("newslist.ejs", { title: "Sports" });
};

exports.getcontact = (req, res, next) => {
  res.render("contact.ejs", { title: "Contact" });
};

exports.gettechnology = (req, res, next) => {
  res.render("newslist.ejs", { title: "Technology" });
};
