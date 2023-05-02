
import { useFormik } from "formik";
import React from "react";
// import styles from "./Register.module.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const userRegister = async (value) => {
    setLoading(true);
    try {
      const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", value);
      if (data.message === "success") {
        console.log(data);
        setLoading(false);
        navigate("/login");
        toast("Registration successfully")
      }
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      setMessageError(error.response.data.message);
    }
  };

  let validation = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Minimum length is 3 chars").max(15, " Maximum length is 15 chars"),
    email: Yup.string().required("Email is required").email("Email is invalid!"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[a-z0-9]{5,10}$/i, "Password must include characters with length from 5 to 10 chars"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Your phone number must be Egyptian"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: userRegister,
  });

  return (
    <>
      <div className="container">
        <div className="w-50 m-auto py-5">
          <h3>Register Now: </h3>

          {messageError ? <div className="alert alert-danger">{messageError}</div> : null}

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input onBlur={formik.handleBlur} className="form-control mb-2" onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" />
            {formik.errors.name && formik.touched.name && <div className="alert alert-danger">{formik.errors.name}</div>}

            <label htmlFor="email">Email:</label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
            {formik.errors.email && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}

            <label htmlFor="password">Password:</label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
            {formik.errors.password && formik.touched.password && <div className="alert alert-danger">{formik.errors.password}</div>}

            <label htmlFor="rePassword">rePassword:</label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" />
            {formik.errors.rePassword && formik.touched.rePassword && <div className="alert alert-danger">{formik.errors.rePassword}</div>}

            <label htmlFor="phone">Phone:</label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" />
            {formik.errors.phone && formik.touched.phone && <div className="alert alert-danger">{formik.errors.phone}</div>}

            <button type="submit" className="btn btn-success text-white" disabled={loading || !(formik.isValid && formik.dirty)}>
              {loading ? <i className="fa-solid fa-fan fa-spin"></i> : "Register"}
            </button>
            <hr />

            <h6 className="my-3">do you have account ?
              <Link to="/login" className=" text-decoration-none"> Sign in</Link>
            </h6>
          </form>
        </div>
      </div>
    </>
  );
}
