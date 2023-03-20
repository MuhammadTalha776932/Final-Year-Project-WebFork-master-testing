const mongoose = require("mongoose");

const { Schema } = mongoose;

let DashBoardSchema = new Schema({
  DownloadDetails: Object,
});

module.exports = DashBoardSchema;
