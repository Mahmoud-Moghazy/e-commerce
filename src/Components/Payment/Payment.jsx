
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import styles from "./Payment.module.css";

export default function Payment() {
  // const userAddress = JSON.parse(localStorage.getItem("uAddress"));
  // console.log(userAddress);+

  const navigate = useNavigate()

  const {cartId,setNumOfItems} = useContext(cartContext);

  const [paymentMethod, setPaymentMethod] = useState(null)

  let userToken = localStorage.getItem("uToken");
  let headers = { token: userToken };

  const onlinePayment = async (values) => {
    try {
      const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=https://Mahmoud-Moghazy.github.io/e-commerce/#/`,
      {shippingAddress:values},
      {headers:headers});
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const cashOnDelivery = async (values) => {
    try {
      const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartId}`,
      {shippingAddress:values},
      {headers:headers});
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //? address Validation
  let addressValidation = Yup.object({
    details: Yup.string().required("Address Details is Required").min(5, "Details minlength is 5 chars").max(35, "Details maxlength is 35 chars"),
    city: Yup.string().required("City is Required").min(3, "City minlength is 3 chars").max(10, "City maxlength is 10 chars"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone must be valid Eg-number"),
  });

  let addressFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: addressValidation,
    onSubmit: async (values) => {
      if (paymentMethod === "online") {
        let res = await onlinePayment(values);
        if (res.status === "success") {
          window.open(res.session.url);
          setNumOfItems(0);
          navigate("/")
        }
      }else if(paymentMethod === "cash") {
        let res = await cashOnDelivery(values);
        if (res.status === "success") {
          toast.success("Your request has been sent successfully");
          setNumOfItems(0);
          navigate("/")
        }
      }
    },
  });

  return (
    <>
      <div className="container text-center py-5">
        <div className="row">
          <div className="col">
            <div className="div w-50 m-auto" id="form">
              <form onSubmit={addressFormik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="tel" className="form-control" id="phone" name="phone" value={addressFormik.values.phone} onBlur={addressFormik.handleBlur} onChange={addressFormik.handleChange} />
                  <label htmlFor="phone">Phone</label>
                  {addressFormik.errors.phone && addressFormik.touched.phone && <div className="alert alert-danger">{addressFormik.errors.phone}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="details" name="details" value={addressFormik.values.details} onBlur={addressFormik.handleBlur} onChange={addressFormik.handleChange} />
                  <label htmlFor="details">Address</label>
                  {addressFormik.errors.details && addressFormik.touched.details && <div className="alert alert-danger">{addressFormik.errors.details}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="city" name="city" value={addressFormik.values.city} onBlur={addressFormik.handleBlur} onChange={addressFormik.handleChange} />
                  <label htmlFor="city">City</label>
                  {addressFormik.errors.city && addressFormik.touched.city && <div className="alert alert-danger">{addressFormik.errors.city}</div>}
                </div>

                <button onClick={()=>setPaymentMethod("online")} type="submit" className="btn w-25 btn-outline-success me-2"> Credit </button>
                <button onClick={()=>setPaymentMethod("cash")} type="submit" className="btn w-25 btn-outline-success"> Cash on delivery </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
