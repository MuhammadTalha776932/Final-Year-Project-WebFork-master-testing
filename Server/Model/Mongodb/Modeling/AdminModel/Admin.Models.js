const mongoose = require("mongoose");

const AdminSchema = require("../../Schema/AdminSchema/AdminSchema");

const { model } = mongoose;

const AdminModel = model("Admin", AdminSchema);

module.exports = AdminModel;
