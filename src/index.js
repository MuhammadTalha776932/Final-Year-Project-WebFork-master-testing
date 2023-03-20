import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import "grapesjs/dist/css/grapes.min.css"

ReactDOM.render(
  <Auth0Provider
    domain="webfork-028989.us.auth0.com"
    clientId="hbmmXaDg7VwgVq8LmrE9tLFYHZlAGWux"
    redirectUri={window.location.origin}
    audience="webfork"
    scope="read:openid read:profile read:email"
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root"),
);
