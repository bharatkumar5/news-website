const User = require("../modal/user");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");

const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

//////////
exports.getsignup = (req, res, next) => {
  let message = req.flash("error");
  console.log(message);
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("User/signup.ejs", {
    title: "signup",
    path: "/users/signup",
    errorMessage: message,
  });
};

exports.postsignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  const errors = validationResult(req);
  console.log(errors[0]);
  if (!errors.isEmpty()) {
    res.status(404).render("User/signup.ejs", {
      title: "signup",
      path: "/users/signup",
      errorMessage: errors.array()[0].msg,
    });
  }
  User.findOne({ email: email })
    .then((userdoc) => {
      if (userdoc) {
        req.flash("error", "email already exit");
        return res.redirect("/users/signup");
      }
      return bcrypt.hash(password, 12).then((hashpass) => {
        const user = new User({
          name: name,
          email: email,
          password: hashpass,
        });
        return user.save();
      });
    })
    .then((result) => {
      res.redirect("/users/login");
      return transport.sendMail({
        to: email,
        from: "world-affair@hotmail.com",
        subject: "success",
        html: `<p> Dear ${name} Thank you for registration with world-affair Now you are able to comment and like on various Post <br> 
        Regards, The world-affailr </p>`,
      });
    })
    .catch((err) => console.log(err));
};

//login////////////
exports.getlogin = (req, res, next) => {
  res.render("User/login.ejs", {
    title: "login",
    path: "/users/login",
  });
};

exports.postlogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Not found any record");
        return res.redirect("/users/login/");
      }
      return bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            req.session.islogin = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/other");
            });
          }

          req.flash("error", "invalid password");
          return res.redirect("/users/login/");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/users/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postlogout = (req, res, next) => {
  console.log("hello");
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

//reset password/////

exports.getreset = (req, res, next) => {
  res.render("User/reset.ejs", { title: "reset", path: "/users/reset" });
};
