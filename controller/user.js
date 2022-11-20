exports.getsignup = (req, res, next) => {
  res.render("User/signup.ejs", { title: "signup", path: "/users/signup" });
};

exports.getlogin = (req, res, next) => {
  consolog.log("user");
  res.render("User/login.ejs", { title: "login", path: "/users/login" });
};
