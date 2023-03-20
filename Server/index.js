//#region import external files
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const bodyParser = require("body-parser");

const ConnectToMongodb = require("./Model/Connectivity/Connect-To-Mongodb");

const server = express();

const GetProtectedData = require("./Auth0/postAuth0/Auth0Cells/GetProtectedCell");

const Auth0User = require("./Model/Mongodb/Modeling/ModelingControl");

const jwt = require("express-jwt").expressjwt;

const jwks = require("jwks-rsa");

const AuthRoutes = require("./Auth0/postAuth0/AuthRouteProtected/AuthRoute");

const CartRoutes = require("./Routers/CartRouters");

const AdminRoutes = require("./Routers/AdminRoutes/Admin.routes");

const PaymentRouter = require("./Routers/PaymentRoute/Payment.route");

const DashboardRoutes = require("./Routers/DashBoardRoute/DashBoard.route");

//#endregion

// Auth0 Jwt configuration
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://webfork-028989.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "webfork",
  issuer: "https://webfork-028989.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({
  path: [
    "*",
    "/create-payment-intent",
    "/payment",
    "/editor/customized",
    "/editor/assets/js/main.js",
    "/logo192.png",
    "/editor/customized",
    "http://localhost:3001/editor/customized",
  ],
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json({}));
server.use(express.json({}));
server.use(express.static("public"));

server.use(
  cors({
    origin: "*",
    method: ["GET", "POST"],
  }),
);
server.use(helmet());

let port = process.env.PORT || process.env._ALT_PORT || 3001;

server.use(jwtCheck);

//?
ConnectToMongodb("webfork", "webfork", "WebFork").catch((e) => console.log(e));

//?
/* Home page or App page route */
server.use("/home", AuthRoutes);
/* cart route */
server.use("/cart", CartRoutes);
/* admin route */
server.use("/admin", AdminRoutes);
/* cart remove route */
server.post("/delete", async (req, res) => {
  try {
    const cartDetails = req?.body?.data.Cart;
    const accessToken = req?.headers?.authorization?.split(" ")[1];
    const response = await GetProtectedData(accessToken).catch((e) =>
      console.info(e),
    );
    console.log(response);
    await Auth0User.findOneAndUpdate(
      {
        sub: response?.data?.sub,
        "DownloadDetails.name": cartDetails?.name,
        "DownloadDetails.qty": { $gt: 0 },
      },
      {
        $inc: {
          "DownloadDetails.$.qty": -1,
        },
      },
      {
        returnDocument: "after",
      },
      function (err, result) {
        if (err) {
          console.info(err);
        } else {
          console.log([result].length);
          res.send(result);
          res.end();
        }
      },
    ).catch((e) => console.info(e));
  } catch (e) {
    console.info(e);
  }
});

server.use("/dashboard", DashboardRoutes);

server.use("/v1/payment", PaymentRouter);

let pages;
server.get("/editor/customized", async (req, res) => {
  const accessToken = req;
  // console.info((accessToken.body));
  // const response = await GetProtectedData(accessToken);
  res.send(pages);
});

server.post("/editor/customized", async (req, res) => {
  const accessToken = req?.headers?.authorization?.split(" ")[1];
  // const response =await GetProtectedData(accessToken);
  pages = req.body;
  console.log(req.body);
  res.send("Successfull!");
});

server.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "internal server error";
  res.status(status).send(message);
});
server.listen(port, () => console.log(`server running at port ${port}`));
