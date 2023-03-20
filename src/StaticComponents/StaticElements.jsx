import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PreNavbar from "../components/PreNavbar";
const StaticElements = () => {
  return (
    <>
      <PreNavbar />
      <Navbar />
      <Outlet />
    </>
  );
};

export default StaticElements;
