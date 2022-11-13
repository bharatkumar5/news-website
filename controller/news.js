const { render } = require("ejs");
const News = require("../modal/news");

exports.getallnews = (req, res, next) => {
  News.find().then((doc) => {
    const tech = doc.filter((el) => {
      if (el.category === "Technology") {
        return el;
      }
    });

    const sport = doc.filter((el) => {
      if (el.category === "Sports") {
        return el;
        gi;
      }
    });

    console.log(sport.length);
    res.render("index.ejs", {
      title: "express",
      news: doc,
      tech: tech,
      sport: sport,
    });
  });
};

exports.getsinglenews = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  News.findById(id).then((doc) => {
    console.log(doc.id);
    res.render("singlenews.ejs", { title: "single news", news: doc });
  });

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
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => console.log("error"));

  res.redirect("/");
};

exports.getcontact = (req, res, next) => {
  res.render("contact.ejs", { title: "contact" });
};
