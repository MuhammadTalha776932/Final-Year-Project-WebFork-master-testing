const express = require("express");

const StoreCartDetailIntoDatabase = require("./RouterCells");

const CartRoutes = express.Router();

/* This route is responsiable for handle get method request and response from the cart module*/
CartRoutes.get("/", (req, res) => {
  res.send({
    message: "Nothing to show",
    code: 404,
  });
});

/* 
* This route is responsible for the handling the post method request and response from the cart module
* It used the promise named StoreCartDetailIntoDatabase.
*/
CartRoutes.post("/", async (req, res) => {
  try {
    StoreCartDetailIntoDatabase(req, res).catch((e) => console.info(e));
  } catch (error) {
    console.info(error);
  }
});

module.exports = CartRoutes;
