
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import emptyCart from "../../images/no order.webp";
import { Link } from 'react-router-dom';

export default function AllOrders({ userData }) {

  const [userOrders, setUserOrders] = useState(null);
  console.log(userOrders);


  const getUserOrders = async () => {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userData.id}`);
      setUserOrders(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    getUserOrders();
  }, [userData]);

  return (
    <>
      <div className="container py-5">

        {userOrders ? (userOrders.length === 0 ? (
          <div className="orderEmpty text-center">
            <img src={emptyCart} alt="empty cart" className="d-block m-auto w-50 rounded-5" />
            <Link to={"/"}>
              <button className="btn btn-outline-success mt-2">Shopping Now</button>
            </Link>
          </div>
        ) :
          (
            <div className="all-orders">
              <h2 className="text-center p-3">All Orders</h2>
              <div className="accordion" id="accordionExample">
                {userOrders.map((order, indx) => (
                  <div className="accordion-item" key={indx}>
                    <h2 className="accordion-header">
                      <button className={indx === 0 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${indx}`} aria-expanded={indx === 0 ? "true" : "false"} aria-controls={`collapse${indx}`}>
                        <div>
                          <h4>
                            <span className="text-success">Total Order Price : </span>
                            <span className="text-warning">{order.totalOrderPrice} </span>
                            <span>EGP</span>
                          </h4> <hr />

                          <div className=" d-flex justify-content-around text-center">

                            <div className="me-3">
                              <p className="text-success">Cart Items</p>
                              <span>{order.cartItems.length}</span>
                            </div>

                            <div className="me-3">
                              <p className="text-success">Tax Price</p>
                              <span>{order.taxPrice} </span>
                              <span>EGP</span>
                            </div>

                            <div className="me-3">
                              <p className="text-success">Shipping Price</p>
                              <span>{order.shippingPrice} </span>
                              <span>EGP</span>
                            </div>

                            <div className="me-3">
                              <p className="text-success">Payment Method</p>
                              <span>{order.paymentMethodType}</span>
                            </div>

                            <div className="me-3">
                              <p className="text-success">Order At</p>
                              <span>{new Date(order.createdAt).toLocaleString("default", { day: "numeric", month: "long", year: "numeric" })} </span> <br />
                              <span className="text-info">{new Date(order.createdAt).toLocaleString("default", { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>

                          </div>
                        </div>
                      </button>
                    </h2>

                    <div id={`collapse${indx}`} className={indx === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className="row row-cols-1 ">
                          {order.cartItems.map((item, indx) => (
                            <div className="col p-2" key={indx}>
                              <div className="item d-flex align-items-center pb-2">
                                <div className="card bg-light h-100">
                                  <img src={item.product.imageCover} className="card-img-top w-100" alt={item.title} height={120} />
                                </div>
                                <div className="card-body mx-3">
                                  <p className="card-text m-0">
                                    <span>count : </span>
                                    <span className="text-info">{item.count}</span>
                                  </p>
                                  <p className="card-text m-0">
                                    <span>price : </span>
                                    <span className="text-info">{item.price} </span>
                                    <span>EGP</span>
                                  </p>
                                  <p className="card-text m-0">
                                    <span>title : </span>
                                    <span className="text-info">{item.product.title.split(" ").slice(0, 2).join(" ")}</span>
                                  </p>
                                  <p className="card-text m-0">
                                    <span>brand : </span>
                                    <span className="text-info">{item.product.brand.name}</span>
                                  </p>
                                  <p className="card-text m-0">
                                    <span>category : </span>
                                    <span className="text-info">{item.product.category.name}</span>
                                  </p>
                                </div>
                              </div>
                              <hr />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
          : (
            <LoadingScreen />
          )}
      </div>
    </>
  );
}
