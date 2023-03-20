const mongoose = require("mongoose");

const { Schema } = mongoose;

let PaymentSchema = new Schema({
  UserName: String,
  SecretKey: String,
  PaymentDetails: Number,
});

module.exports = PaymentSchema;
