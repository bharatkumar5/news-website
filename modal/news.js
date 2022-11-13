const mongoose = require("mongoose");
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
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsschema);
