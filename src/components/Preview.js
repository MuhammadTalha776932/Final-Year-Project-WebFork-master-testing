import React from "react";
import { useState } from "react";
import { usePaymentStore } from "./../store/main.store";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { GetTokenSilently } from "../LocalStorage/util";

import "../styles/Preview.css";
import { useCartStore } from "./../store/cartStore/CartStore";

const Preview = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();

  const addCarts = useCartStore((state) => state?.addCarts);
  const payment = usePaymentStore((state) => state?.payment);

  const addToCartStore = (payload) => [addCarts(payload)];

  const previewData = useCartStore((state) => state?.previewState);
  const [preview] = useState(previewData);
  const [paymentDetails, setPaymentDetails] = React.useState(payment);

  const addDownloadDetails = async (payload, token) => {
    try {
      if (payload?.price === 0) {
        await axios
          .post(
            "/dashboard",
            {
              data: {
                ...payload,
              },
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          )
          .then()
          .catch((error) =>
            console.info(["Dashboard post method error", error]),
          );
      }
    } catch (error) {
      console.log({ name: "Client side addDownloadDetails", error });
    }
  };

  const HandleCart = async (Cart, e) => {
    // e.preventDefault();
    try {
      if (isAuthenticated) {
        // let token = await getAccessTokenSilently({});
        let token = GetTokenSilently("token");
        isAuthenticated && addToCartStore(Cart);
        await axios
          .post(
            "/cart",
            {
              data: {
                Cart,
              },
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          )
          .then((response) =>
            response?.status === 200 ? addDownloadDetails(Cart, token) : null,
          )
          .catch((error) => console.error(["Promise catch error", error]));
        // data?.data?.forEach((element) => {
        //   addToCartPageStore(element);
        // });
        window.location.replace("/");
      } else {
        loginWithPopup();
      }
    } catch (error) {
      console.info(["Try block catch error", error]);
    }
  };

  React.useEffect(() => {
    let isRender = true;
    if (isRender) {
      setPaymentDetails(payment);
      console.info(paymentDetails);
    }
    return () => {
      isRender = false;
    };
  }, [payment, paymentDetails]);

  return (
    <>
      {preview ? (
        <>
          <img src={preview?.preview} alt="" id="prv-img" />
          {preview?.price > 0 ? (
            <>
              <a
                id="preview-btn"
                href={preview?.livePreview} // /payment route
                target={"_blank"}
                rel="noreferrer"
                // onClick={(e) => HandleCart(preview, e)}
                className="btn btn-primary"
              >
                live Preview
              </a>
            </>
          ) : (
            <>
              {" "}
              <a
                id="preview-btn"
                href={preview?.pdfpath}
                target={"_blank"}
                rel="noreferrer"
                className="btn btn-primary"
                onClick={(e) => HandleCart(preview, e)}
              >
                Download Free
              </a>
              {/* Talha */}
            </>
          )}
        </>
      ) : (
        window?.location?.replace("/")
      )}
    </>
  );
};

export default Preview;
