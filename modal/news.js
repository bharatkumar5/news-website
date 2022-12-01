const mongoose = require("mongoose");
const User = require("../modal/user");
const Schema = mongoose.Schema;
const newsschema = new Schema({
  title: {
    type: String,

    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  author: {
    type: String,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  comments: [{}],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsschema);
