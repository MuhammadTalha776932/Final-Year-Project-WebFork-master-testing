import React from "react";
import PreloadingStyle from "../styles/Preloading.module.css";

const Preloading = () => {
  return (
    <>
      {" "}
      <div className={`${PreloadingStyle?.loader}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default Preloading;
