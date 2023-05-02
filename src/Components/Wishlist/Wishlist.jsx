import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import toast from "react-hot-toast";
import emptyWishList from "../../images/empty wishlist.png";
import { Link } from "react-router-dom";

// import styles from './Wishlist.module.css';

export default function Wishlist() {

  const { wishlistProducts, removeFromWishlist, addToCart } = useContext(cartContext);
  console.log(wishlistProducts);

  const remove = async (id) => {
    let { message } = await removeFromWishlist(id);
    toast.error(message);
  };

  const add = async (ProId) => {
    let { status, message } = await addToCart(ProId);
    if (status === "success") {
      toast.success(message);
      remove(ProId);
    }
  };

  return (
    <>
      <div className="container py-5">
        {wishlistProducts ? (
          wishlistProducts.length === 0 ? (
            <div className="wishlistEmpty bg-light w-50 m-auto text-center rounded-5">
              <img src={emptyWishList} alt="empty wishlist" className="w-100 rounded-5" />
              <Link to={"/"}>
                <button className="btn btn-outline-success mt-2">Shopping Now</button>
              </Link>
            </div>
          ) : (
            <div className="wishlist">
              <h1 className="py-3">Wishlist</h1>
              <div className="row row-cols-1 row-cols-lg-2 g-3">
                {wishlistProducts.map((item, inx) => (
                  <div className="col p-3 bg-light d-flex justify-content-between align-items-center" key={inx}>
                    <div className="item d-flex align-items-center rounded-3 p-3">
                      <figure className="figure my-auto">
                        <img src={item.imageCover} className="figure-img m-0 w-100 rounded" height={200} alt={inx} />
                      </figure>
                      <figcaption className="figure-caption p-3">
                        <h6 className="text-success">{item.title.split(" ").slice(0, 2).join(" ")}</h6>
                        <h6>Bran : {item.brand.name}</h6>
                        <h6>Category : {item.category.name}</h6>
                        <h6>Price : <span className="text-success">{item.price}</span> L.E </h6><hr />

                        <button onClick={() => { remove(item.id); }} className="btn btn-danger w-100 my-2">Remove from wishlist</button>
                        <button onClick={() => { add(item.id); }} className="btn btn-success w-100 my-2">Add to cart</button>

                      </figcaption>
                    </div>
                  </div>
                ))}
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