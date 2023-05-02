
import React, { useContext, useEffect, useState } from "react";
// import styles from "./Home.module.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import $ from "jquery";
import { Pagination } from "@mui/material";
import Stack from '@mui/material/Stack';
import Slider from "react-slick";
import img1 from "../../images/slider-image-1.jpeg";
import img2 from "../../images/slider-image-2.jpeg";
import img3 from "../../images/slider-image-3.jpeg";
import img4 from "../../images/grocery-banner.png";
import img5 from "../../images/grocery-banner-2.jpeg";

export default function Home({ userData }) {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const handleChangePage = (_, value) => { setPage(value); };

  const [allProducts, setAllProducts] = useState(null);
  const [results, setResults] = useState(0);

  const [loading, setLoading] = useState(true);

  const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, CartProducts, wishlistProducts, userCart, userWishlist } = useContext(cartContext);

  const add = async (ProId) => {
    if (userData === null) {
      navigate('/login');
    } else {
      let { status, message } = await addToCart(ProId);
      if (status === "success") {
        toast.success(message);
        $(`#add${ProId}`).fadeOut(500, () => {
          $(`#remove${ProId}`).fadeIn(500);
        });
      }
    }
  };

  const addProductToWishlist = async (ProId) => {
    if (userData === null) {
      navigate('/login');
    } else {
      let { status, message } = await addToWishlist(ProId);
      if (status === "success") {
        toast.success(message);
        // $(`#addWishlist${ProId}`).fadeOut(500, () => {
        //   $(`#removeWishlist${ProId}`).fadeIn(500);
        // });
      }
    }
  };

  const remove = async (ProId) => {
    let { status } = await removeFromCart(ProId);
    if (status === "success") {
      toast.error("Remove Item Successfully");
      $(`#remove${ProId}`).fadeOut(500, () => {
        $(`#add${ProId}`).fadeIn(500);
      });
    }
  };

  const removeProductFromWishlist = async (ProId) => {
    let { status, message } = await removeFromWishlist(ProId);
    if (status === "success") {
      toast.error(message);
      // $(`#removeWishlist${ProId}`).fadeOut(500, () => {
      //   $(`#addWishlist${ProId}`).fadeIn(500);
      // });
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://route-ecommerce.onrender.com/api/v1/products/", { params: { limit: 15, page } });
      setAllProducts(data.data);
      setResults(data.metadata.numberOfPages);
      setLoading(false);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  let cartProductIds = new Set(CartProducts?.map((cartItem) => cartItem.product.id));
  let wishlistProductsIds = new Set(wishlistProducts?.map((Item) => Item.id));

  if (!userData) {
    cartProductIds = null;
    wishlistProductsIds = null;
  }

  useEffect(() => {
    getAllProducts();
    userCart();
    userWishlist();
  }, [page]);

  if (loading || !allProducts) {
    // add a loading screen when data is being fetched or allProducts is null
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container py-5">
        <div className="photos mb-5" >
          <Slider {...settings}>
            <figure>
              <img src={img1} className="w-100" alt="" height={300} />
            </figure>
            <figure>
              <img src={img2} className="w-100" alt="" height={300} />
            </figure>
            <figure>
              <img src={img3} className="w-100" alt="" height={300} />
            </figure>
            <figure>
              <img src={img4} className="w-100" alt="" height={300} />
            </figure>
            <figure>
              <img src={img5} className="w-100" alt="" height={300} />
            </figure>
          </Slider>
        </div>
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-2">
          {allProducts?.map((product) => (
            <div className="col" key={product._id}>
              <div className="item h-100 d-flex flex-column justify-content-between bg-light p-2">
                <Link to={`/productDetails/${product._id}`} className="figure text-decoration-none">
                  <img src={product.imageCover} className="figure-img w-100" alt={product.title} />
                  <figcaption className="figure-caption">
                    <h6 className="text-success">{product.brand.name}</h6>
                    <p className="text-danger m-0">{product.category.name}</p>
                    <p className="text-warning">{product.title.split(" ").slice(0, 2).join(" ")}</p>
                    <div className="d-flex justify-content-between">
                      <small className="text-info fs-6">
                        {product.priceAfterDiscount ? <><p className="text-decoration-line-through text-danger m-0">{product.price} </p><span>{product.priceAfterDiscount}</span></> : <span>{product.price}</span>}
                        <span className=" text-black"> EGP</span>
                      </small>
                      <small>
                        <i className="fa-solid fa-star text-warning"></i> {product.ratingsAverage}
                      </small>
                    </div>
                  </figcaption>
                </Link>
                <div className="buttons d-flex justify-content-between">
                  {cartProductIds?.has(product._id) ?
                    <button id={`remove${product._id}`} onClick={() => { remove(product._id); }} className="btn btn-danger w-75 text-capitalize">remove from cart</button> :
                    <button id={`add${product._id}`} onClick={() => { add(product._id); }} className="btn btn-success w-75 text-capitalize ">add to cart</button>
                  }
                  {wishlistProductsIds?.has(product._id) ?
                    <button id={`removeWishlist${product._id}`} onClick={() => { removeProductFromWishlist(product._id); }} className="btn btn-outline-danger">
                      <i className="fa-solid fa-heart"></i>
                    </button> :
                    <button id={`addWishlist${product._id}`} onClick={() => { addProductToWishlist(product._id); }} className="btn btn-outline-success">
                      <i className="fa-regular fa-heart"></i>
                    </button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination justify-content-center my-4">
          <Stack spacing={0}>
            <Pagination count={results} color="success" page={page} onChange={handleChangePage} />
          </Stack>
        </div>
      </div>
    </>
  );
}
