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
        title: "Home",
        news: doc,
        tech: tech,
        sport: Sport,
        Business: Business,
        Entertainment: Entertainment,
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getsinglenews = (req, res, next) => {
  const id = req.params.id;

  News.findById(id)
    .then((doc) => {
      res.render("singlenews.ejs", {
        title: "single news",
        news: doc,
        path: "/news",
      });
    })
    .catch((err) => console.log(err));
};

exports.getpublishnews = (req, res, next) => {
  res.render("form.ejs", {
    title: "publish news",
    path: "/add-news",
    editing: false,
  });
};

/// Create news///////////

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

//////category news access/////

exports.getbusiness = (req, res, next) => {
  News.find({ category: "Business" })
    .sort({ date: "desc" })
    .then((doc) => {
      res.render("newslist.ejs", {
        title: "business",
        allnews: doc,
        path: "/business",
      });
    });
};

exports.getentertainment = (req, res, next) => {
  News.find({ category: "Entertainment" })
    .sort({ date: "desc" })
    .then((doc) => {
      res.render("newslist.ejs", {
        title: "Entertainment",
        allnews: doc,
        path: "/Entertainment",
      });
    });
};

exports.gethealth = (req, res, next) => {
  News.find({ category: "Health" })
    .sort({ date: "desc" })
    .then((doc) => {
      res.render("newslist.ejs", {
        title: "Health",
        allnews: doc,
        path: "/Health",
      });
    });
};

exports.getother = (req, res, next) => {
  News.find({ category: "Other" })
    .sort({ date: "desc" })
    .then((doc) => {
      res.render("newslist.ejs", {
        title: "Other",
        allnews: doc,
        path: "/other",
      });
    });
};

exports.getPolitics = (req, res, next) => {
  News.find({ category: "Politics" })
    .sort({ date: "desc" })
    .then((doc) => {
      res.render("newslist.ejs", {
        title: "Politics",
        allnews: doc,
        path: "/Politics",
      });
    });
};

exports.getsports = (req, res, next) => {
  News.find({ category: "Sports" })
    .sort({ date: "desc" })
    .then((doc) => {
      res.render("newslist.ejs", {
        title: "Sports",
        allnews: doc,
        path: "/sports",
      });
    });
};

exports.gettechnology = (req, res, next) => {
  News.find({ category: "Technology" })
    .sort({ date: "desc" })
    .then((doc) => {
      res.render("newslist.ejs", {
        title: "Technology",
        allnews: doc,
        path: "/technology",
      });
    });
};

exports.getcontact = (req, res, next) => {
  res.render("contact.ejs", { title: "Contact", path: "/Contact" });
};

exports.getabout = (req, res, next) => {
  res.render("About.ejs", { title: "About", path: "/about" });
};

///editing////

exports.getedit = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }

  const newsId = req.params.newsid;
  News.findById(newsId).then((doc) => {
    console.log(doc.date);

    res.render("form.ejs", {
      title: "editing",
      path: "/edit-news",
      editing: editMode,
      news: doc,
    });
  });
};

exports.postedit = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const category = req.body.category;
  const content = req.body.content;
  const id = req.body.id;

  News.findById(id)
    .then((news) => {
      news.title = title;
      news.image = image;
      news.category = category;
      news.content = content;
      return news.save();
    })
    .then((doc) => {
      console.log(doc);
      res.redirect(`/${doc.category}`);
    });
};
