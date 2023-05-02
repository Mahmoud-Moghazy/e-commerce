/** @format */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
// import styles from "./ProductDetails.module.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import $ from "jquery";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function ProductDetails({ userData }) {

  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useContext(cartContext);

  const add = async (id) => {
    if (userData === null) {
      navigate('/login');
    } else {
      let res = await addToCart(id);
      if (res.status === "success") {
        toast.success(res.message);
        $("#add").fadeOut(500, function () {
          $("#remove").fadeIn(500);
        });
      }
    }
  };

  const remove = async (id) => {
    let res = await removeFromCart(id);
    if (res.status === "success") {
      toast.error("Remove Item Successfully");
      $("#remove").fadeOut(500, function () {
        $("#add").fadeIn(500);
      });
    }
  };

  const { id } = useParams(); // use destructuring to get id directly
  const [productDetails, setProductDetails] = useState(null); // initialize state to null instead of empty array
  const [loading, setLoading] = useState(true);

  console.log(productDetails);

  const getProductDetails = async (id) => {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
      setProductDetails(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getProductDetails(id); // use the destructured id variable here
  }, [id]);

  if (loading || !productDetails) {
    // add a loading screen when data is being fetched or productDetails is null
    return <LoadingScreen />;
  }

  return (
    <div className="container py-5">
      <div className="details">
        <div className="row align-items-center">
          <div className="col-12 col-lg-3">
            <div className="photos">
              <Slider {...settings}>
                {productDetails.images.map((img, index) => (
                  <figure key={index}>
                    <img src={img} className="w-100" alt="" />
                  </figure>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className="info my-5">
              <h4>{productDetails.title}</h4>
              <p className=" my-3">{productDetails.description}</p>
              <p className=" text-danger">{productDetails.brand.name}</p>
              <p className=" text-danger">{productDetails.category.name}</p>
              <div className="price-rate d-flex justify-content-between">
                <small className="text-info fs-6">
                  {productDetails.priceAfterDiscount ? <><p className="text-decoration-line-through text-danger m-0">{productDetails.price} </p><span>{productDetails.priceAfterDiscount}</span></> : <span>{productDetails.price}</span>}
                  <span className=" text-black"> EGP</span>
                </small>
                <small className="d-flex align-items-center">
                  <span className="mx-2">{productDetails.ratingsAverage}</span>
                  <Stack spacing={1}>
                    <Rating name="half-rating-read" defaultValue={productDetails.ratingsAverage} precision={0.1} readOnly />
                  </Stack>
                </small>
              </div>
              <button
                onClick={() => {
                  add(productDetails.id);
                }}
                id="add"
                className="btn btn-success w-100 my-3 text-capitalize"
              >
                add to cart
              </button>
              <button
                style={{ display: "none" }}
                onClick={() => {
                  remove(productDetails.id);
                }}
                id="remove"
                className="btn btn-danger w-100 my-3 text-capitalize"
              >
                remove from cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
