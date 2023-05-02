/** @format */

import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import toast from "react-hot-toast";
import emptyCart from "../../images/empty cart.png";
import axios from "axios";
// import styles from './Cart.module.css';
import { Link } from "react-router-dom";

export default function Cart() {
  let userToken = localStorage.getItem("uToken");
  let headers = { token: userToken };

  const { removeFromCart, updateProductCount, CartProducts, setCartProducts, TotalPrice, setNumOfItems } = useContext(cartContext);

  const remove = async (id) => {
    await removeFromCart(id);
    toast.error("Remove Item Successfully");
  };

  const updateQuantity = async (id, count) => {
    await updateProductCount(id, count);
    toast.success("Product Count Updated");
  };

  const clearUserCart = async () => {
    try {
      const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`, { headers: headers });
      toast.success("Remove Cart Successfully");
      setCartProducts([]);
      setNumOfItems(0);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <div className="container py-5">
        {CartProducts ? (
          CartProducts.length === 0 ? (
            <div className="cartEmpty text-center">
              <img src={emptyCart} alt="empty cart" className="m-auto w-50 rounded-5 d-block" />
              <Link to={"/"}>
                <button className="btn btn-outline-success mt-2">Shopping Now</button>
              </Link>
            </div>
          ) : (
            <div className="Shopping-Cart">
              <h1 className="py-3">Shopping Cart</h1>
              <h5>
                Total Price : <span className="text-success">{TotalPrice}</span> L.E
              </h5>
              <div className="row row-cols-1 row-cols-lg-2 g-3">
                {CartProducts.map((item, inx) => (
                  <div className="col p-3 bg-light d-flex justify-content-between align-items-center" key={inx}>
                    <div className="item d-flex align-items-center  rounded-3 p-3">
                      <figure className="figure my-auto">
                        <img src={item.product.imageCover} className="figure-img m-0 w-100 rounded" height={150} alt={inx} />
                      </figure>
                      <figcaption className="figure-caption p-3">
                        <h6 className="text-success">{item.product.title.split(" ").slice(0, 2).join(" ")}</h6>
                        <h6>Quantity : {item.count}</h6>
                        <h6> Price : <span className="text-success">{item.price}</span> L.E </h6><hr />
                        {item.count > 1 ? <h6> Total : <span className="text-success">{item.price * item.count}</span> L.E </h6> : ""}
                        <button onClick={() => { remove(item.product._id); }} className="btn btn-danger w-100 my-2">Remove</button>
                      </figcaption>
                    </div>
                    <div className="cont">
                      <button onClick={() => { updateQuantity(item.product._id, item.count + 1); }} className="btn btn-outline-success me-2"> + </button>
                      <button onClick={() => { updateQuantity(item.product._id, item.count - 1); }} className="btn btn-outline-danger"> - </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row my-4">
                <div className="col bg-light p-4">
                  <div className="cart-handel d-flex justify-content-between">
                    <button onClick={clearUserCart} className="btn btn-outline-danger"> Remove Cart </button>
                    <Link to="/payment" className="btn btn-outline-success"> Check Out </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <LoadingScreen />
        )}
      </div>
    </>
  );
}
