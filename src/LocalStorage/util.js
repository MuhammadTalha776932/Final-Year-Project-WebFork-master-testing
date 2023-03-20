const SetLocalStorage = (isAuthenticated) => {
  isAuthenticated &&
    localStorage.setItem("isAuthenticatedAuth0", isAuthenticated);
};
const ResetLocalStorage = () => {
  localStorage.removeItem("isAuthenticatedAuth0");
  localStorage.setItem("isAuthenticatedAuth0", false);
};
const GetLocalStorage = (key) => {
  return localStorage.getItem(key);
};
const SetTokenSilently = (Token) => {
  localStorage.setItem("token", JSON.stringify(Token));
  return "token store in localStorage successfull";
};
const GetTokenSilently = (key) => {
  let token = JSON.parse(localStorage.getItem(key));
  return token;
};

module.exports = {
  SetLocalStorage,
  ResetLocalStorage,
  GetLocalStorage,
  SetTokenSilently,
  GetTokenSilently,
};
