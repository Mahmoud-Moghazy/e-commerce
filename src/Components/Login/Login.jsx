
import React from "react";
// import styles from "./Login.module.css";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';

export default function Login({ SUD }) {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const userLogin = async (value) => {
    setLoading(true);
    try {
      const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", value);
      console.log(data.user);
      localStorage.setItem("uToken", data.token);
      SUD();
      setLoading(false);
      toast("Welcome Back");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessageError(error.response.data.message);
    }
  };

  let validation = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid!"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[a-z0-9]{5,10}$/i, "Password must include characters with length from 5 to 10 chars"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: userLogin,
  });

  return (
    <>
      {/* ======================================================= */}
      {/* start login */}
      <div className="container">
        <div className="w-50 m-auto py-5">
          <h3>Login Now: </h3>

          {messageError ? <div className="alert alert-danger">{messageError}</div> : null}

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
            {formik.errors.email && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}

            <label htmlFor="password">Password:</label>
            <input className="form-control mb-2" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
            {formik.errors.password && formik.touched.password && <div className="alert alert-danger">{formik.errors.password}</div>}

            <button type="submit" className="btn btn-success text-white" disabled={loading || !(formik.isValid && formik.dirty)}>
              {loading ? <i className="fa-solid fa-fan fa-spin"></i> : "Login"}
            </button>
            <hr />

            <Link to="/forgotPassword" className=" text-decoration-none">
              <h6 className="my-3">Forgot Password ?</h6>
            </Link>

            <h6 className="my-3">don't have account ?
              <Link to="/register" className=" text-decoration-none"> Register now</Link>
            </h6>
          </form>
        </div>
      </div>
      {/* start login */}
      {/* ======================================================= */}
    </>
  );
}
