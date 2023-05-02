/** @format */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { cartContext } from "../../Context/CartContext";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import styles from "./Navbar.module.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Navbar({ userData, Logout, userName }) {

  const { NumOfItems,NumOfWishlistItems } = useContext(cartContext);

  return (
    <>
      {/* ======================================================= */}
      {/* start Navbar */}
      <nav className="navbar navbar-expand-lg py-4 bg-light shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} className="w-100" alt="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/categories">
                  Category
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/brands">
                  Brands
                </Link>
              </li>
              {userData === null ? "" :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/allorders">
                      All Orders
                    </Link>
                  </li>
                </>
              }

            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item d-flex">
                <Link className="nav-link mx-3 mx-lg-0" aria-current="page" to="/">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
                <Link className="nav-link mx-3 mx-lg-0" aria-current="page" to="/">
                  <i className="fa-brands fa-facebook"></i>
                </Link>
                <Link className="nav-link mx-3 mx-lg-0" aria-current="page" to="/">
                  <i className="fa-brands fa-tiktok"></i>
                </Link>
                <Link className="nav-link mx-3 mx-lg-0" aria-current="page" to="/">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link className="nav-link mx-3 mx-lg-0" aria-current="page" to="/">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
                <Link className="nav-link mx-3 mx-lg-0" aria-current="page" to="/">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </li>

              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/profile">
                      <p className="userName border border-1 border-success rounded-circle text-success text-capitalize fw-bolder m-0">{userName.slice(0, 1)}</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/cart">
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={NumOfItems} max={10} color="success">
                          <ShoppingCartIcon color="info" fontSize="large" />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/wishlist">
                      <IconButton aria-label="favorite">
                        <StyledBadge badgeContent={NumOfWishlistItems} max={10} color="success">
                          <FavoriteIcon color="secondary" fontSize="large" />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span role="button" onClick={Logout} className="nav-link text-danger" aria-current="page">
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* end Navbar */}
      {/* ======================================================= */}
    </>
  );
}
