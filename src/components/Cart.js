import { useMemo, useState } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";
import useCartPageStore from "../store/CartpageStore/CartPageStore";
import { GetTokenSilently } from "../LocalStorage/util";
import { useIsAuthStore } from "./../store/IsAuth.store";
import { shallow } from "zustand";
import "../styles/Cart.css";

import axios from "axios";
import Preloading from "./Preloading";

const Cart = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const IsAuth = useIsAuthStore((state) => state?.IsAuth);
  const [total, setTotal] = useState();
  const [totalQuantity, setTotalQuantity] = useState();
  const CartPageStoreObjects = useCartPageStore(
    (state) => state?.CartPageStoreObject,
    shallow,
  );

  const removeCartPage = useCartPageStore((state) => state?.removeCartPage);

  const removeItems = () => {};

  const setTotals = () => {
    setTotal(
      CartPageStoreObjects?.reduce(
        (acc, curr) => acc + Number(curr?.price) * curr?.qty,
        0,
      ),
    );
    setTotalQuantity(
      CartPageStoreObjects?.reduce((acc, curr) => acc + curr?.qty, 0),
    );
  };

  return IsAuth ? (
    <div className="main">
      <div className="home">
        <div className="productContainer">
          {CartPageStoreObjects?.map((Cart, index) =>
            Cart.qty !== 0 && Cart?.price !== 0 ? (
              <ListGroup>
                <ListGroup.Item>
                  <Row key={Cart}>
                    <Col md={2}>
                      <Image src={Cart?.image} alt={Cart?.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <span>{Cart?.name}</span>
                    </Col>
                    <Col md={2}>Rs {Cart?.price}</Col>
                    <Col md={2}>{/* <Rating rating={Cart.ratings} /> */}</Col>
                    <Col md={2}>
                      Quantity : {Cart?.qty}
                      {/* <Form.Control
                    as="select"
                    value={Cart.qty}
                    onChange={(e) => e}
                  >
                     {[...Array(Cart.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))} 
                  </Form.Control> */}
                    </Col>
                    <Col md={2}>
                      {Cart?.qty > 0 && Cart?.price > 0 ? (
                        <Button
                          type="button"
                          variant="light"
                          onClick={async () => {
                            try {
                              removeCartPage(Cart);
                              setTotals();
                              let token = GetTokenSilently("token");
                              axios
                                .post(
                                  "/delete",
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
                                .catch((e) => console.info(e));
                              // window?.location?.replace("/cart");
                            } catch (error) {
                              console.error(error.message);
                            }
                          }}
                        >
                          <AiFillDelete />
                        </Button>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            ) : null,
          )}
        </div>
        {/* <div className="filters summary">
          <span className="title">Subtotal ({totalQuantity}) items</span>
          <span
            style={{ fontWeight: 700, fontSize: 20 }}
          >{` Total: Rs ${total}`}</span>
          <Button
            type="button"
            disabled={CartPageStoreObjects?.length === 0}
            onClick={() => window?.location?.replace("/payment")}
          >
            Proceed to Checkout
          </Button>
        </div> */}
      </div>
    </div>
  ) : (
    <>
      <Preloading />
    </>
  );
};

export default Cart;
