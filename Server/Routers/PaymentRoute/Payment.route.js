const express = require("express");
const axios = require("axios");
const PaymentModel = require("../../Model/Payments/Payments.model");
const PaymentRouter = express.Router();

const responseObject = {
  statusCode: 200,
  statusText: "OK|ok",
  successful: "Successful|successful",
  Payment: "Successful",
  Panding: false,
  PaymentState: "Pay",
};
const FailObject = {
  message: "Balance is no enough for transaction",
  Payment: "Fail",
  Panding: true,
  PaymentState: "Panding",
};
/*
 * PaymentRouter is router for /payment route which handle our get mehtod request and response
 * for us.
 */
PaymentRouter.get("/", (req, res) => {
  res.send({
    message: "Nothing to show",
    code: 404,
  });
});
/*
 * PaymentRouter is router for /payment route which handle our post mehtod request and response
 * for us.
 */
PaymentRouter.post("/", async (req, res) => {
  try {
    // console.info(req.body);
    /*
     * This response variable hold the authenticated information which come from auth0 server when we provide the
     * accessToken that come from the client. It usually a object or undefined.
     */
    const accessToken = req?.headers?.authorization?.split(" ")[1];
    await axios.get("https://webfork-028989.us.auth0.com/userinfo", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    /*
     * This commented code is responsable for create the demo payment account if user
     * have no account and Secret key.
     */
    /*     // let docs = {
      UserName: req.body.UserName || null,
      SecretKey: req.body.SecretKey || null,
      PaymentDetails: req.body.PaymentDetails || null,
    };

    let NewPayment = new PaymentModel({
      UserName: req.body.UserName,
      SecretKey: req.body.SecretKey,
      PaymentDetails: req.body.PaymentDetails,
    });
    NewPayment.save(); 
    */

    /*
     * If user already have account and balanced in it then it samply transaction
     * and return the account information back with some response.
     */
    PaymentModel.findOne({ SecretKey: req.body.SecretKey }, {}).then((docs) => {
      if (docs !== null) {
        if (docs?.PaymentDetails >= req?.body?.PaymentDetails) {
          /*
           * Here we update the payments details after check is balance is suitable or not for transaction.
           */
          PaymentModel.findOneAndUpdate(
            { SecretKey: req.body.SecretKey },
            {
              $min: {
                PaymentDetails:
                  docs?.PaymentDetails - req?.body?.PaymentDetails,
              },
            },
            {
              returnDocument: "after",
            },
          )
            .then((result) => console.info(result))
            .then(() => res.send(responseObject))
            .catch((error) => console.info(["Error from catch block", error]));
        } else {
          res.send(FailObject);
        }
      } else {
        let NewPayment = new PaymentModel({
          UserName: req.body.UserName,
          SecretKey: req.body.SecretKey,
          PaymentDetails: 5000,
        });
        NewPayment.save((err) => {
          if (!err) {
            console.log("New account with that UserName is now added");
          }
        });
        res.send({
          message: "User does not Exist Or You Type Wrong Secret Key",
        });
      }
    });
  } catch (error) {
    console.info(["Error from catch block", error]);
  }
});

module.exports = PaymentRouter;
