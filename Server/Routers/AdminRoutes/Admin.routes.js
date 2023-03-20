/* eslint-disable no-unused-vars */
const GetProtectedData = require("../../Auth0/postAuth0/Auth0Cells/GetProtectedCell");
const AdminModel = require("../../Model/Mongodb/Modeling/AdminModel/Admin.Models");

const express = require("express");

const AdminRoutes = express.Router();

AdminRoutes.get("/", async (req, res) => {
  /*
   * This response variable hold the authenticated information which come from auth0 server when we provide the
   * accessToken that come from the client. It usually a object or undefined.
   */
  const accessToken = req?.headers?.authorization?.split(" ")[1];
  const response = await GetProtectedData(accessToken).catch((e) =>
    console.info(e),
  );
  /* 
  * Admin.findOne is used for check is admin user is exist or not
  */
  AdminModel.findOne({}).then((err, results) => {
    if (!err) {
      if (results !== undefined || results !== null) {
        const noEntities = {
          isAdmin: true,
          documentExist: true,
          isUserRegister: true,
          ...results,
        };
        res.send({ ...noEntities });
      }
    }
  });
});

AdminRoutes.post("/", async (req, res) => {
  let reqParam = req?.body;
  res.status(200).send("request accepted");
});

module.exports = AdminRoutes;
