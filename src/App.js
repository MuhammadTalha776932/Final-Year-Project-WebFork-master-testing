import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import HomePage from "./components/home/homepage";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Cart from "./components/Cart";

import useCartPageStore from "./store/CartpageStore/CartPageStore";
import Preview from "./components/Preview";
import Tabs from "./components/Tabs";
import Submit from "./components/Submit";
import Team from "./components/Team";

import StaticElements from "./StaticComponents/StaticElements";
import PageNotFound from "./components/PageNotFound";

import DashboardLayout from "./components/Dashboard/layouts/Dashboard.layout";

import { SetTokenSilently, GetTokenSilently } from "./LocalStorage/util";
import Payment from "./components/Payment";
import EditorIndex from "./Editor/Editor.Main/Editor.index";
import TemplateLayout from "./Editor/components/Template.layout";
import useIsAuthStore from "./store/IsAuth.store";

function App() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const IsAuth = useIsAuthStore((state) => state?.IsAuth);
  const setIsAuthStatus = useIsAuthStore((state) => state?.setIsAuthStatus);
  const addCartPage = useCartPageStore((state) => state?.addCartPage);
  // fasih
  useEffect(() => {
    let isRender = true;
    const addToCartPageStore = (payload) => {
      if (payload?.qty !== 0) addCartPage(payload);
    };
    if (isRender) {
      const getResponse = async () => {
        try {
          let token = isAuthenticated ? await getAccessTokenSilently() : null;
          let hold = isAuthenticated ? SetTokenSilently(token) : null;
          setIsAuthStatus(true);
          let tokenSilently = "" + GetTokenSilently("token");
          axios
            .get("/home", {
              headers: {
                authorization: `Bearer ${tokenSilently}`,
              },
            })
            .then((response) => {
              const { data } = response;
              console.info(data);
              data?.forEach((element) => {
                if (element?.price !== 0) addToCartPageStore(element);
              });
            });
        } catch (error) {
          console.log(error);
        }
      };
      (IsAuth || isAuthenticated) && getResponse().catch((e) => console.log(e));
    }
    return () => {
      isRender = false;
    };
  }, [isAuthenticated]);
  /*     IsAuth,
    addCartPage,
    getAccessTokenSilently,
    isAuthenticated,
    setIsAuthStatus, */
  return (
    <>
      <Routes>
        <Route element={<StaticElements />}>
          <Route path="/" element={<HomePage />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="preview" element={<Preview />} />
          <Route path="faq" element={<Tabs />} />
          <Route path="Submit" element={<Submit />} />
          <Route path="Team" element={<Team />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/editor/customized" element={<EditorIndex />} />
        <Route exact path="/admin" element={<DashboardLayout />} />
      </Routes>
    </>
  );
}

export default App;
