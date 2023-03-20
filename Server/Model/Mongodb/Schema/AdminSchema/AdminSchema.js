const mongoose = require("mongoose");

const { Schema } = mongoose;

let AdminSchema = new Schema({
  sub: String,
  nickname: String,
  name: String,
  picture: String,
  email: String,
  userType: String,
});

module.exports = AdminSchema;
