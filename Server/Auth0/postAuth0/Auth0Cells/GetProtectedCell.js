const axios = require("axios");
/**
 * GetProtectedData is promise which hanlde the Authenication of user at server side and return the information that come from Auth0 Server.
 * @param  {any} accessToken Store the token come from auth0 client side process.
 */
const GetProtectedData = async (accessToken) => {
  const response = axios.get("https://webfork-028989.us.auth0.com/userinfo", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

module.exports = GetProtectedData;
