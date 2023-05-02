
import React from "react";
import styles from "./Footer.module.css";

import appStore from "../../images/Logos/app-store.png";
import googlePlay from "../../images/Logos/google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-light py-5">
        <div className="container">
          <div className="text text-capitalize">
            <h2 className="my-3">get the freshCart app</h2>
            <p className="text-black-50">we will send you a link, open it on your phone to download the app.</p>
          </div>

          <div className="app-link">
            <div className="row align-items-center">
              <div className="col-12 col-lg-9">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <button type="button" className="btn btn-success w-100 text-capitalize">
                  share app link
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="payment">
            <div className="partners">
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                  <h6 className="text-info">Payment Partners</h6>
                  <span className="mx-2 text-danger">
                    <i className="fab fa-amazon-pay"></i>
                  </span>
                  <span className="mx-2 text-danger">
                    <i className="fab fa-cc-amex"></i>
                  </span>
                  <span className="mx-2 text-danger">
                    <i className="fab fa-cc-mastercard"></i>
                  </span>
                  <span className="mx-2 text-danger">
                    <i className="fab fa-paypal"></i>
                  </span>
                </div>
                <div className="col">
                  <div className=" d-flex align-items-center justify-content-center">
                    <h6 className="text-capitalize d-inline-block">Get deliveries with freshCart</h6>

                    <div className={`${styles.app}`}>
                      <img src={appStore} className=" w-100" alt="app store" />
                    </div>

                    <div className={`${styles.app}`}>
                      <img src={googlePlay} className=" w-100" alt="google play" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
        </div>
      </footer>
    </>
  );
}
