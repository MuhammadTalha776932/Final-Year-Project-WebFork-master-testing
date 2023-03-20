const mongoose = require("mongoose");

const { Schema } = mongoose;

let Auth0User_Schema = new Schema({
  sub: String,
  nickname: String,
  name: String,
  picture: String,
  email: String,
  DownloadDetails: [Object],
  userType: String,
});

module.exports = Auth0User_Schema;
