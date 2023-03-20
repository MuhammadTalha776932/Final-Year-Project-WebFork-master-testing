/* eslint-disable array-callback-return */
const Auth0User = require("../Model/Mongodb/Modeling/ModelingControl");

const GetProtectedData = require("../Auth0/postAuth0/Auth0Cells/GetProtectedCell");


/* 
*  This method is responsible for the controlling the req from the route and connected to database to 
*  fetch require data and then send it back to client vica response.
*/

const StoreCartDetailIntoDatabase = async (req, _res) => {
  try {
    /*
     * Create array for mapping the existing records or non-existing records in database collection,if
     * record is present then is store 'true' else store the false.
     * ConfirmAllFalse is boolean variable that ensure that array is full false or not.
     */
    let arrayOfBoolean = [];
    let confirmAllFalse = false;
    /*
     * cartDetails is a variable which store and hold the data or payload that come from client side vica routes it usually
     * a object.
     * accessToken is a variable which store and hold the token which come from client side to authenticated the user at 
     * server-side ,it basically a auth0 token.
     */
    const cartDetails = req?.body?.data;
    const accessToken = req?.headers?.authorization?.split(" ")[1];
    /* 
    * This response variable hold the authenticated information which come from auth0 server when we provide the 
    * accessToken that come from the client. It usually a object or undefined.
    */
    const response = await GetProtectedData(accessToken);

    /* 
    * AuthUser is a mongodb model which used findOne function to find the record or documents from the database.
    * It search the record based on the Auth0 response object sub attribute because it defined unqiues for each 
    * users.
    */
    await Auth0User.findOne({ sub: response?.data?.sub })
      .then(async (result) => {
        /* 
        * If condition check if the database currently have no documents then add the documents in collection
        * else if false then update the existing documents in the collection
        */
        if (result?.DownloadDetails?.length === 0) {
          await Auth0User.updateOne(
            { sub: response?.data?.sub },
            {
              $push: {
                DownloadDetails: cartDetails?.Cart,
              },
            },
            {
              returnDocument: "after",
            },
          ).then(async (result) => {
            /* 
            * This if check is result variable have a information or not if true then response is send 
            * back to client else console the message.
            */
            if (result !== null || result !== undefined) {
              return await _res?.send(result?.DownloadDetails);
            } else {
              console.log("New Document Does not Added");
            }
          });
          console.info("New Template added");
        } else {
          /* 
          * this switch hold the logic for update the existing documents in collection 
          * which mean that if database have same record then it update only changed value or new value in 
          * documents.
          */
          result?.DownloadDetails?.map((carts, index) => {
            switch (cartDetails?.Cart?.name) {
              case carts?.name:
                arrayOfBoolean.push(true);
                console.info(`match at index ${index}`);
                /* 
                * This findOneAndUpdate is method which find the matching documents in and update the  
                * DownloadDetails attribute in documents by increment of 1.
                * It basically increased the DownloadDetails qty by 1 if document already download.
                */
                Auth0User.findOneAndUpdate(
                  {
                    sub: response?.data?.sub,
                    "DownloadDetails.name": cartDetails?.Cart?.name,
                  },
                  {
                    $inc: {
                      "DownloadDetails.$.qty": 1,
                    },
                  },
                  {
                    returnDocument: "after",
                  },
                )
                  .then(async (result) => {
                    /*
                     * This if check is result variable have a information or not if true then response is send
                     * back to client else console the message.
                     */
                    if (result !== null || result !== undefined) {
                      await _res?.send(result?.DownloadDetails);
                    } else {
                      console.log("Document not available");
                    }
                  })
                  .catch((e) => console.info(e));
                break;

              default:
                arrayOfBoolean.push(false);
                break;
            }
          });

          /* 
          * This statement mapping all the boolean to ensure that is documents exist of not in collection
          * If array have all false it mean download template is new download if atleast one true which mean 
          * that template is download already by this user then samply increased the qty.
          */
          arrayOfBoolean.map((booleanValue) => {
            if (booleanValue) {
              confirmAllFalse = true;
              console.info("Template already download");
            }
          });
          /* 
          * This If statement check if confirmAllFalse is false then add the template download details into 
          * the database or collection.
           */
          if (!confirmAllFalse) {
            await Auth0User.updateOne(
              { sub: response?.data?.sub },
              {
                $push: {
                  DownloadDetails: cartDetails?.Cart,
                },
              },
              {
                returnDocument: "after",
              },
            ).then(async (result) => {
              if (result !== null || result !== undefined) {
                console.info("New Template Details add into Database");

                return await _res?.send(result?.DownloadDetails);
              } else {
                console.log("New Template Not added");
              }
            });
          }
        }
      })
      .catch((e) => console.info(e));
  } catch (e) {
    console.info(e);
  }
};

module.exports = StoreCartDetailIntoDatabase;
