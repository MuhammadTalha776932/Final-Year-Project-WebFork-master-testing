const mongoose = require("mongoose");

const DashBoardSchema = require("../../Schema/DashBoard/DashBoard.schema");

const { model } = mongoose;

const DashBoardModel = model("DownloadDetal", DashBoardSchema);

module.exports = DashBoardModel;
