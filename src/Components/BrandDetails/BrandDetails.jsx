/** @format */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link, useParams, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import $ from "jquery";
import ComingSoon from "../ComingSoon/ComingSoon";
// import styles from "./BrandDetails.module.css";
// import * as React from 'react';

export default function BrandDetails({ userData }) {

  const navigate = useNavigate();

  const { id } = useParams(); // use destructuring to get id directly
  const [brandDetails, setBrandDetails] = useState(null); // initialize state to null instead of empty array
  const [loading, setLoading] = useState(true);
  console.log(brandDetails);

  const { addToCart, removeFromCart } = useContext(cartContext);

  const add = async (id, inx) => {
    if (userData === null) {
      navigate("/login");
    } else {
      let data = await addToCart(id);
      console.log(data);
      if (data.status === "success") {
        toast.success(data.message);
        $(`#add${inx}`).fadeOut(500, function () {
          $(`#remove${inx}`).fadeIn(500);
        });
      }
    }
  };

  const remove = async (id, inx) => {
    let data = await removeFromCart(id);
    if (data.status === "success") {
      toast.error("Remove Item Successfully");
      $(`#remove${inx}`).fadeOut(500, function () {
        $(`#add${inx}`).fadeIn(500);
      });
    }
  };

  const getBrandDetails = async (id) => {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`, {
        params: { brand: id},
      });
      setBrandDetails(data.data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrandDetails(id); // use the destructured id variable here
  }, [id]);

  if (loading || !brandDetails) {
    // add a loading screen when data is being fetched or productDetails is null
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container py-5">
        {brandDetails.length === 0 ? <ComingSoon/> :
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
            {brandDetails.map((brand, inx) => (
              <div className="col" key={brand._id}>
                <div className="item h-100 d-flex flex-column justify-content-between">
                  <Link to={`/productDetails/${brand._id}`} className="figure text-decoration-none">
                    <img src={brand.imageCover} className="figure-img w-100" alt={brand.title} />
                    <figcaption className="figure-caption">
                      <h5 className=" text-success">{brand.brand.name}</h5>
                      <h6 className="">{brand.title.split(" ").slice(0, 2).join(" ")}</h6>
                      <div className="price-rate d-flex justify-content-between">
                        <small className="text-info fs-6">
                          {brand.priceAfterDiscount ? <><p className="text-decoration-line-through text-danger m-0">{brand.price} </p><span>{brand.priceAfterDiscount}</span></> : <span>{brand.price}</span>}
                          <span className=" text-black"> EGP</span>
                        </small>
                        <small>
                          <i className="fa-solid fa-star text-warning"></i> {brand.ratingsAverage}
                        </small>
                      </div>
                    </figcaption>
                  </Link>
                  <button
                    onClick={() => {
                      add(brand._id, inx);
                    }}
                    id={`add${inx}`}
                    className="btn btn-success w-100 my-3 text-capitalize"
                  >
                    add to cart
                  </button>
                  <button
                    style={{ display: "none" }}
                    onClick={() => {
                      remove(brand._id, inx);
                    }}
                    id={`remove${inx}`}
                    className="btn btn-danger w-100 my-3 text-capitalize"
                  >
                    remove from cart
                  </button>
                </div>

              </div>
            ))}
          </div>}

      </div>
    </>
  );
}
