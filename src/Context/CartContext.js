
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export function CartContextProvider({ children }) {

  const [TotalPrice, setTotalPrice] = useState(0);
  const [NumOfItems, setNumOfItems] = useState(0);
  const [CartProducts, setCartProducts] = useState(null);
  const [cartId, setCartId] = useState(null);

  const [NumOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);

  let userToken = localStorage.getItem("uToken");
  let headers = { token: userToken };

  const addToCart = async (proId) => {
    try {
      const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/cart", { productId: proId }, { headers: headers });
      if (data.status === "success") {
        // setNumOfItems(data.numOfCartItems);
        // setCartProducts(data.data.products);
        // setTotalPrice(data.data.totalCartPrice);
        await userCart();
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const removeFromCart = async (proId) => {
    try {
      const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${proId}`, { headers: headers });
      if (data.status === "success") {
        setNumOfItems(data.numOfCartItems);
        setCartProducts(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateProductCount = async (proId, count) => {
    try {
      const { data } = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${proId}`, { count: count }, { headers: headers });

      if (data.status === "success") {
        setNumOfItems(data.numOfCartItems);
        setCartProducts(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const userCart = async () => {
    try {
      const { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/cart", { headers: { token: localStorage.getItem("uToken") } });

      if (data.status === "success") {
        setCartId(data.data._id);
        setNumOfItems(data.numOfCartItems);
        setCartProducts(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response.data.statusMsg === "fail") {
        setCartProducts([]);
        setNumOfItems(0);
      }
      return error;
    }
  };

  const addToWishlist = async (proId) => {
    try {
      const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/wishlist", { productId: proId }, { headers: headers });
      if (data.status === "success") {
        userWishlist();
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const removeFromWishlist = async (proId) => {
    try {
      const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${proId}`, { headers: headers });
      if (data.status === "success") {
        userWishlist();
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const userWishlist = async () => {
    try {
      const { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/wishlist", { headers: { token: localStorage.getItem("uToken") } });
      if (data.status === "success") {
        setWishlistProducts(data.data);
        setNumOfWishlistItems(data.data.length);
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response.data.statusMsg === "fail") {

      }
      return error;
    }
  };

  useEffect(() => {
    userCart();
  }, []);

  useEffect(() => {
    userWishlist();
  }, []);

  return (
    <>
      <cartContext.Provider value={{ cartId, addToCart, removeFromCart, updateProductCount, CartProducts, setCartProducts, setNumOfItems, TotalPrice, NumOfItems, userCart, addToWishlist, removeFromWishlist, NumOfWishlistItems, wishlistProducts, userWishlist }}>
        {children}
      </cartContext.Provider>
    </>
  );
}
