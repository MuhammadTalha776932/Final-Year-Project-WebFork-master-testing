import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PreNavbar.css";
import { useAuth0 } from "@auth0/auth0-react";

import useCartPageStore from "../store/CartpageStore/CartPageStore";
import shallow from "zustand/shallow";
import { useIsAuthStore } from "./../store/IsAuth.store";

const cartIcon = (
  <svg
    className="temp"
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 0 24 24"
    width="20px"
    fill="#000000"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const PreNavbar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const IsAuth = useIsAuthStore((state) => state?.IsAuth);
  const setIsAuthStatus = useIsAuthStore((state) => state?.setIsAuthStatus);
  const [isAuth, setIsAuth] = useState();
  const [totalQuantity, setTotalQuantity] = useState();
  const CartPageStoreObjects = useCartPageStore(
    (state) => state.CartPageStoreObject,
    shallow,
  );
  const logout_ResetLocalStorage = () => {
    setIsAuthStatus(false);
    logout({});
  };
  useEffect(() => {
    let isRender = true;
    if (isRender) {
      setTotalQuantity(
        CartPageStoreObjects?.reduce((acc, curr) => acc + curr?.qty, 0),
      );
      setTimeout(() => {
        setIsAuth(IsAuth);
      }, 1000);
    }
    return () => {
      isRender = false;
    };
  }, [CartPageStoreObjects, IsAuth]);
  return (
    <div className="preNav">
      <div>
        <Link to="/#">WebFork</Link> <span>|</span>
        <Link to="/#">GET Latest Update</Link> <span>|</span>
        <Link to="#contact">ONLINE HELP</Link> <span>|</span>
        <Link to="/Submit">Submit a Template</Link>
        <a href="#categories">Check Tamplates ﹀</a>
      </div>
      <div>
        {/* <a  href="/#">SIGN IN</a> <span>|</span> */}
        <Link
          to="/"
          onClick={() =>
            IsAuth ? logout_ResetLocalStorage() : loginWithRedirect()
          }
        >
          {IsAuth ? "LOGOUT" : "SiGN UP"}
        </Link>
        <span>|</span>
        <Link to="/cart">
          {" "}
          {cartIcon} CART ({totalQuantity})
        </Link>
      </div>
    </div>
  );
};

export default PreNavbar;
