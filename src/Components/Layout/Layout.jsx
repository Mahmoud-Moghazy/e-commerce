import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";

export default function Layout({ userData, setUserData ,userName}) {

  let navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("uToken");
    setUserData(null);
    navigate('')
  }

  return (
    <>
      <Navbar userData={userData} Logout={Logout} userName={userName} />
      <Outlet />
      <Footer />
    </>
  );
}