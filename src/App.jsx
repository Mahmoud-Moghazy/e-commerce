/** @format */
import jwtDecode from "jwt-decode";
import { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { CartContextProvider } from "./Context/CartContext";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import Brands from "./Components/Brands/Brands";
import Profile from "./Components/Profile/Profile";
import Payment from "./Components/Payment/Payment";
import Register from "./Components/Register/Register";
import AllOrders from './Components/AllOrders/AllOrders';
import Categories from "./Components/Categories/Categories";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import NotFound from './Components/NotFound/NotFound';
import CategoriesDetails from "./Components/CategoriesDetails/CategoriesDetails";
import Wishlist from './Components/Wishlist/Wishlist';

export default function App() {
  
  const [userData, setUserData] = useState(null);
  const [userName, setName] = useState(null);


  function saveUserData() {
    let decodedToken = jwtDecode(localStorage.getItem("uToken"));
    setUserData(decodedToken);
    setName(decodedToken.name)
  }

  useEffect(() => {
    if (localStorage.getItem("uToken") !== null && userData === null) {
      saveUserData();
    }
  }, [userData]);

  const routers = createHashRouter([
    {
      path: "",
      element: <Layout setUserData={setUserData} userData={userData} userName={userName} />,
      children: [
        
        { index: true, element: <Home userData={userData} /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
        { path: "cart", element:<ProtectedRoute><Cart /></ProtectedRoute>},
        { path: "payment", element:<ProtectedRoute><Payment/></ProtectedRoute>},
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login SUD={saveUserData} /> },
        { path: "profile", element: <ProtectedRoute><Profile userData={userData} setUserData={setUserData} setName={setName} /></ProtectedRoute>},
        { path: "allorders", element: <ProtectedRoute><AllOrders userData={userData} /></ProtectedRoute> },
        { path: "wishlist", element:<ProtectedRoute><Wishlist userData={userData}/></ProtectedRoute>},

        { path: "productDetails/:id", element: <ProductDetails userData={userData}/> },
        { path: "brandDetails/:id", element: <BrandDetails userData={userData} /> },
        { path: "CategoriesDetails/:id", element: <CategoriesDetails userData={userData} /> },
        { path: "*", element: <NotFound/> },

      ],
    },
  ]);
  return (
    <>
      <CartContextProvider>
        <Toaster />
        <RouterProvider router={routers}></RouterProvider>
      </CartContextProvider>
    </>
  );
}
