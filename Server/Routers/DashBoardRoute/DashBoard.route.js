/* eslint-disable no-unused-vars */
const GetProtectedData = require("../../Auth0/postAuth0/Auth0Cells/GetProtectedCell");
const DashBoardModel = require("../../Model/Mongodb/Modeling/DashBoardModel/DashBoard.model");
const express = require("express");
const AdminModel = require("../../Model/Mongodb/Modeling/AdminModel/Admin.Models");
const DashboardRoutes = express.Router();

/*
 * DashboardRoutes is a router for the /dashboard route which is reponsible for the handle the get and post
 * request and response from client.
 */
DashboardRoutes.get("/", async (req, res) => {
  try {
    /*
     * This response variable hold the authenticated information which come from auth0 server when we provide the
     * accessToken that come from the client. It usually a object or undefined.
     */
    const accessToken = req?.headers?.authorization?.split(" ")[1];
    const response = await GetProtectedData(accessToken);
    /*
     * AdminModel.findOne method used to find the record from the admin collection
     * to ensure documents is exist or not.
     */
    await AdminModel.findOne({}).then((AdminResponse) => {
      if (true) {
        if (AdminResponse !== undefined || AdminResponse !== null) {
          const noEntities = {
            isAdmin: true,
            documentExist: true,
            isUserRegister: true,
          };
          console.info(["admin", AdminResponse]);
          /* DashBoard Data */

          /*
           * Here we fetch all records or documents from the collection of dashboard to performed the calculation.
           */
          DashBoardModel.find({}).then((results) => {
            if (true) {
              if (results !== undefined || results !== null) {
                console.info(["database data", "successful accessed"]);
                /*
                 * Here totalEarning hold the total money which we earn from premium template.
                 */
                let totalEarning = results?.reduce(
                  (acc, curr) =>
                    acc +
                    Number(curr?.DownloadDetails?.price) *
                      Number(curr?.DownloadDetails?.qty),
                  0,
                );
                /*
                 * Here totalSales hold the total sales which we get from premium template.
                 * It count the total premium template w.r.t all user transactions.
                 */
                let totalSales = results?.filter(
                  (items) => items?.DownloadDetails?.price > 0,
                ).length;
                /*
                 * Calculate the total download include the free and paid template download.
                 */
                let totalDownload = results?.reduce(
                  (accr, cur) => accr + cur?.DownloadDetails?.qty,
                  0,
                );

/*                 const TotalDownloadByCategories = (categories) => {
                  // let StoreByCategories = [];
                  let TotalPrice = results
                    ?.filter(
                      (items, i) =>
                        items?.DownloadDetails?.category === categories &&
                        items?.DownloadDetails?.price > 0,
                    )
                    .reduce(
                      (accr, cur) => accr + cur?.DownloadDetails?.price,
                      0,
                    );
                  let TotalQuantity = results
                    ?.filter(
                      (items, i) =>
                        items?.DownloadDetails?.category === categories &&
                        items?.DownloadDetails?.price > 0,
                    )
                    .reduce((accr, cur) => accr + cur?.DownloadDetails?.qty, 0);
                  let CategoryObject = {
                    TotalPrice,
                    TotalQuantity,
                  };
                  return CategoryObject;
                };
                let CategoryObject = TotalDownloadByCategories("Gym");
                console.info(["Summery of order", CategoryObject]); */

                const { data } = response;
                // here is object who send back to client with information
                const ResponseObject = {
                  totalDownload,
                  totalSales,
                  totalEarning,
                  data: results,
                  admin: { ...AdminResponse },
                  config: { ...noEntities },
                };
                res.send({ ...ResponseObject });
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.info(error);
    res.send(error?.message);
  }
});

/* 
* Post method route is used for store information into database. Information of premium template download...
*/
DashboardRoutes.post("/", async (req, res) => {
  try {
    /*
     * This response variable hold the authenticated information which come from auth0 server when we provide the
     * accessToken that come from the client. It usually a object or undefined.
     */
    const { data } = req?.body;
    const accessToken = req?.headers?.authorization?.split(" ")[1];
    const response = await GetProtectedData(accessToken);

    /* 
    * Dashboard Model to store DownloadDetails of premium templates.
    */
    let Dashboard = await new DashBoardModel({
      DownloadDetails: data,
    }).save();

    console.info(["Dashboard route", data]);
    res.send({ statusCode: 200, statusText: "OK" });
  } catch (error) {
    console.info(error);
    res.send(error?.message);
  }
});

module.exports = DashboardRoutes;
