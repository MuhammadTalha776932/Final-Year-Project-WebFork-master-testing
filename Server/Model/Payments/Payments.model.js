const mongoose = require("mongoose");
const PaymentSchema = require("./Payment.schema");

const { model } = mongoose;

const PaymentModel = model("Payments", PaymentSchema);

module.exports = PaymentModel;
