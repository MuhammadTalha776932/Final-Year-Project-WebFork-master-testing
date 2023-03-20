const GetProtectedData = require("../Auth0Cells/GetProtectedCell");


const Auth0User = require("../../../Model/Mongodb/Modeling/ModelingControl");


/* 
* StoreDataToMongoDB is a promise which handle the login and signin user details
*/

const StoreDataToMongoDB = async (req, _res) => {
  try {
    const accessToken = req?.headers?.authorization?.split(" ")[1];
    const response = await GetProtectedData(accessToken);

    //? Code to print response
    console.info(response.data);
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

    if (Auth0Docu) {
      /* 
      * here we find the document based on user login if user exist then return it details to client 
      * else add the new user 
      */
      Auth0User.findOne(
        { sub: response?.data?.sub },

        (results) => {
          if (results !== null || results !== undefined) {
            console.log("Send Response back to client from home route");
            _res.send(results?.DownloadDetails);
          } else {
            console.log("New User is added into database");
            return Auth0Docu && Auth0Docu.save();
          }
        },
      );
    }
    // Auth0Docu && Auth0Docu.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = StoreDataToMongoDB;
