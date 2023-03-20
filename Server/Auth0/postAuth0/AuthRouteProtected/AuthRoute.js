const express = require("express");
const GetProtectedData = require("../Auth0Cells/GetProtectedCell");

const Auth0User = require("../../../Model/Mongodb/Modeling/ModelingControl");
const StoreDataToMongoDB = require("./Auth0Functional");

const AuthRoutes = express.Router();

AuthRoutes.get("/", async (req, res) => {
  try {
    const accessToken = req?.headers?.authorization?.split(" ")[1];
    const response = await GetProtectedData(accessToken);

    //? Code to print response
    // console.info(response.data);
    /* Create the user document */
    let Auth0Docu = new Auth0User({
      sub: response?.data?.sub,
      nickname: response?.data?.nickname,
      name: response?.data?.name,
      picture: response?.data?.picture,
      email: response?.data?.email,
      DownloadDetails: [],
      userType: "Client",
    });
    /*
     * here we find the document based on user login if user exist then return it details to client
     * else add the new user
     */
    if (response.data.sub) {
      Auth0User.findOne(
        { sub: response?.data?.sub },

        (err, results) => {
          if (results !== null) {
            console.log("Send Response back to client from home route");
            // console.log(results);
            res.send(results?.DownloadDetails || []);
          } else {
            console.log("New User is added into database");

            Auth0Docu.save();
          }
        },
      );
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = AuthRoutes;
