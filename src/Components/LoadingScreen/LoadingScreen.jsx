/** @format */

import React from "react";
// import styles from "./LoadingScreen.module.css";
import { ThreeCircles } from "react-loader-spinner";

export default function LoadingScreen() {
  return (
    <>
      <div className="load vh-100 d-flex align-items-center justify-content-center">
        <ThreeCircles
          height="300"
          width="300"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    </>
  );
}
