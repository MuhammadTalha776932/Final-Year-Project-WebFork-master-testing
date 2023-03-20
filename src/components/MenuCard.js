/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import useCartStore from "../store/cartStore/CartStore";
import axios from "axios";
import "../styles/Card.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { GetTokenSilently } from "../LocalStorage/util";
import useIsAuthStore from "../store/IsAuth.store";
const MenuCard = ({ menuData }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const IsAuth = useIsAuthStore((state) => state?.IsAuth);
  const addCarts = useCartStore((state) => state?.addCarts);

  const addToCartStore = (payload) => [addCarts(payload)];

  const addDownloadDetails = async (payload, token) => {
    try {
      if (payload?.price !== 0) {
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

  const addToPreview = (payload) => {
    addCarts(payload);
    // window.location.replace("/preview");
  };

  const HandleCart = async (Cart, e) => {
    try {
      if (IsAuth) {
        let token = GetTokenSilently("token");
        IsAuth && addToCartStore(Cart);
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

        // window.location.replace("/");
      } else {
        loginWithRedirect({ redirectUri: window.location.href });
      }
    } catch (error) {
      console.info(["Try block catch error", error]);
    }
  };

  return (
    <>
      <section className="main-card--container">
        {menuData.map((curElem, index) => {
          return (
            <>
              <div className="card-container" key={index + curElem?.id}>
                <div className="card-Menu">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">
                      {curElem.id}
                    </span>
                    <span className="card-author subtle">{curElem.name}</span>
                    <h2 className="card-title">{curElem.name}</h2>
                    <span className="card-descripion subtle">
                      {curElem.description}
                    </span>
                    <div className="card-read">Read</div>
                  </div>
                  <img
                    src={curElem.image}
                    alt="card-images"
                    className="card-media"
                  />
                  {curElem?.price === 0 ? (
                    <>
                      <span className="card-tag-view subtle">
                        <a
                          href={`${curElem?.pdfpath}`} // curElem?.padpath
                          target={"_blank"}
                          rel="noreferrer"
                          onClick={(e) => HandleCart(curElem, e)}
                        >
                          Download Now
                        </a>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="card-tag-view subtle">
                        <Link
                          to={`/payment`} // /payment
                          onClick={(e) => addToPreview(curElem)}
                          // onClick={(e) => HandleCart(curElem, e)}
                        >
                          Buy Now
                        </Link>
                      </span>
                    </>
                  )}

                  <span className="card-tag-view subtle">
                    <a
                      href={`${curElem?.livePreview}`}
                      target={"_blank"}
                      rel="noreferrer"
                      // onClick={(e) => addToPreview(curElem)}
                    >
                      Live Preview
                    </a>
                  </span>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default MenuCard;
