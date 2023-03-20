import React from "react";
import "../styles/Payment.css";
import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
import useCartPageStore from "../store/CartpageStore/CartPageStore";
import { GetTokenSilently } from "../LocalStorage/util";
import { usePaymentStore } from "./../store/main.store";
import { useCartStore } from "./../store/cartStore/CartStore";
import { useAuth0 } from "@auth0/auth0-react";
import useIsAuthStore from "../store/IsAuth.store";
const Payment = () => {
  const [Payment, setPayment] = React.useState();
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [total, setTotal] = React.useState();
  const [PaymentDetails, setPaymentDetals] = React.useState(total);
  const IsAuth = useIsAuthStore((state) => state?.IsAuth);
  const CartPageStoreObjects = useCartPageStore(
    (state) => state?.CartPageStoreObject,
  );
  const addCarts = useCartStore((state) => state?.addCarts);
  const addToCartStore = (payload) => [addCarts(payload)];
  const previewData = useCartStore((state) => state?.previewState);
  const PaymentStatus = usePaymentStore((state) => state?.paymentStatus);

  const handleChange = (e) => {
    setPayment({
      ...Payment,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const addDownloadDetails = async (payload, token) => {
    try {
      if (payload?.price >= 0) {
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
      if (IsAuth) {
        // let token = await getAccessTokenSilently({});
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
        // data?.data?.forEach((element) => {
        //   addToCartPageStore(element);
        // });
        // window.location.reload();
      } else {
        loginWithPopup();
      }
    } catch (error) {
      console.info(["Try block catch error", error]);
    }
  };
  const h = async (e) => {
    try {
      e.preventDefault();
      let token = GetTokenSilently("token");
      console.info(Payment);
      await axios
        .post(
          "/v1/payment",
          {
            UserName: Payment?.UserName,
            SecretKey: Payment?.SecretKey,
            PaymentDetails: PaymentDetails,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          if (response?.data?.statusCode === 200) {
            PaymentStatus(response?.data);
            setTimeout(() => {
              let atag = document?.createElement("a");
              atag.setAttribute("href", previewData?.pdfpath);
              atag.setAttribute("target", "_blank");
              atag.setAttribute("rel", "noreferrer");
              atag.click();
              HandleCart(previewData);
              setTimeout(() => {
                window?.location?.replace("/");
              }, 2000);
            }, 1000);
          } else {
            alert(response?.data?.message);
          }
        })
        .catch((error) =>
          console.info(["error from post method of Payment"], error),
        );
    } catch (error) {
      console.error(["Payment Component Error"], error);
    }
  };

  React.useEffect(() => {
    let isRender = true;
    if (isRender) {
      // setTotal(
      //   CartPageStoreObjects?.reduce(
      //     (acc, curr) => acc + Number(curr?.price) * curr?.qty,
      //     0,
      //   ),
      // );
      setTotal(previewData?.price);
      setPaymentDetals(total);
    }
    return () => {
      isRender = false;
    };
  }, [CartPageStoreObjects, previewData.price, total]);
  return (
    <>
      <div className="payment-container p-0">
        <div className="payment-card px-4">
          <p className="h8 py-3 mt-5">Payment Details</p>
          <div className="payment-row gx-3">
            <div className="col-12">
              <div className="d-flex flex-column">
                <p className="text mb-1">Person Name</p>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Name"
                  name={"UserName"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <p className="text mb-1">Secret Key</p>
                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="12345678435678"
                  name={"SecretKey"}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="col-6">
                    <div className="d-flex flex-column">
                        <p className="text mb-1">Expiry</p>
                        <input className="form-control mb-3" type="text" placeholder="MM/YYYY">
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-column">
                        <p className="text mb-1">CVV/CVC</p>
                        <input className="form-control mb-3 pt-2 " type="password" placeholder="***">
                    </div>
                </div> */}
            <br />
            <div className="col-12">
              <p className="text mb-1">Payment Amount</p>
              <input
                className="form-control mb-3 ps-3"
                type={"number"}
                placeholder="12345678435678"
                name={"PaymentDetails"}
                value={PaymentDetails}
              />
              <div
                className="payment-btn btn-primary mb-3"
                onClick={(e) =>
                  h(e).catch((error) =>
                    console.info(["error from h function", error]),
                  )
                }
              >
                {/* <span className="ps-3">Pay Rs550</span> */}
                <span className="fas fa-arrow-right"></span>
                Pay Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
