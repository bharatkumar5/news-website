const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const commentschema = new Schema(
  {
    Userid: {
      type: String,
    },
    Name: {
      type: String,
      require: true,
    },
    Postid: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentschema);
