const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const User = require("./modal/user");
const News = require("./modal/news");
const Comment = require("./modal/comment");
// session store instance//
const store = new MongoDBStore({
  uri:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qapkskq.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`,
  collection: "mysession",
});

const indexRouter = require("./routes/news");
const usersRouter = require("./routes/users");
const user = require("./modal/user");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//session middleware//
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    name: "news-app",
    store: store,
  })
);

store.on("error", function (error) {
  console.log(error);
});

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.authenticate = req.session.islogin;
  next();
});

app.use(indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
