/** @format */

import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import styles from './Profile.module.css';
import * as Yup from "yup";
import { toast } from "react-hot-toast";

export default function Profile({ userData, setUserData,setName }) {  

  //! API's
  //? API to Update Logged user data
  const updateUserData = async (values) => {
    try {
      const { data } = await axios.put(`https://route-ecommerce.onrender.com/api/v1/users/updateMe/`, values, { headers: headers });
      console.log(data);
      if (data.message === "success") {
        getUserData();
        setName(data.user.name)
        toast.success("Your request has been updated successfully");
      }
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors.msg);
    }
  };

  //? API to reset password
  const resetPassword = async (values) => {
    try {
      const { data } = await axios.put(`https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword`, values, { headers: headers });
      if (data.message === "success") {
        toast.success("Your password changed successfully");
        Logout();
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //? API to add address
  const addAddress = async (values) => {
    try {
      const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/addresses", values, { headers: headers });

      if (data.status === "success") {
        setUserAddress(data.data);
        localStorage.setItem("uAddress", JSON.stringify(data.data));
        hideEditField("form", "add"); 
      }
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //? name Validation
  let nameValidation = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Minimum length is 3 chars").max(15, " Maximum length is 15 chars"),
  });

  let nameFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: nameValidation,
    onSubmit: updateUserData,
  });

  //? mail Validation
  let mailValidation = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid!"),
  });

  let mailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: mailValidation,
    onSubmit: updateUserData,
  });

  //? phone Validation
  let phoneValidation = Yup.object({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Your phone number must be Egyptian"),
  });

  let phoneFormik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: phoneValidation,
    onSubmit: updateUserData,
  });

  //? password Validation
  let passwordValidation = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[a-z0-9]{5,10}$/i, "Password must include characters with length from 5 to 10 chars"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  let passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: passwordValidation,
    onSubmit: resetPassword,
  });

  //? address Validation
  let addressValidation = Yup.object({
    name: Yup.string().required("Please Choose a place Type "),
    details: Yup.string().required("Address Details is Required").min(5, "Details minlength is 3 chars").max(35, "Details maxlength is 10 chars"),
    city: Yup.string().required("City is Required").min(3, "City minlength is 3 chars").max(10, "City maxlength is 10 chars"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone must be valid Eg-number"),
  });

  let addressFormik = useFormik({
    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: addressValidation,
    onSubmit: addAddress,
  });

  //! All set state

  //? user Address
  const [userAddress, setUserAddress] = useState(null);

  //? stats comes from user data API
  // const [dataUser, setDataUser] = useState("");
  const [dataUserName, setDataUserName] = useState("");
  const [dataUserEmail, setDataUserEmail] = useState("");
  const [dataUserPhone, setDataUserPhone] = useState("");

  //! User Token
  let userToken = localStorage.getItem("uToken");
  let headers = { token: userToken };

  //! API's
  //? API to remove address
  const removeAddress = async (id) => {
    try {
      const { data } = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/addresses/${id}`, { headers: headers });
      if (data.status === "success") {
        setUserAddress(data.data);
        localStorage.setItem("uAddress", JSON.stringify(data.data));
      }
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //? API to get user addresses
  const getUserAddresses = async () => {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/addresses`, { headers: headers });
      if (data.status === "success") {
        setUserAddress(data.data);
      }
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //? API to get user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/users/${userData.id}`);
      // setDataUser(data.data);
      setDataUserName(data.data.name);
      setDataUserEmail(data.data.email);
      setDataUserPhone(data.data.phone);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //! Functions

  let navigate = useNavigate();

  const Logout = async () => {
    localStorage.removeItem("uToken");
    setUserData(null);
    navigate("/login");
  };

  const showEditField = async (fieldId, buttonId) => {
    $(`#${buttonId}`).fadeOut(100,()=>{
      $(`#${fieldId}`).slideDown(100);
    });
  };

  const hideEditField = async (fieldId, buttonId) => {
    $(`#${fieldId}`).slideUp(100,()=>{
      $(`#${buttonId}`).fadeIn(100);
    });
    
  };
  
  useEffect(() => {
    getUserAddresses();
    getUserData();
  }, [userData]);

  return (
    <>
      <div className="container py-5 text-center">
        <h2 className="text-capitalize my-3">welcome</h2>

        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            <div className="data mb-3">
              <div className="row row-cols-1 ">
                <div className="col">
                  <div className="row row-cols-1 shadow-sm bg-light p-3 m-2">
                    <div className="col">
                      <h6 className="text-start py-2">
                        Name : <span className="text-success">{dataUserName ? dataUserName : ""}</span>
                      </h6>

                      <div id="nameEdit" style={{ display: "none" }} className="div">
                        <form onSubmit={nameFormik.handleSubmit}>
                          <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="name" name="name" value={nameFormik.values.name} onBlur={nameFormik.handleBlur} onChange={nameFormik.handleChange} placeholder="write new Name"/>
                            <label htmlFor="name">write new Name</label>
                          </div>
                          {nameFormik.errors.name && nameFormik.touched.name && <div className="alert alert-danger">{nameFormik.errors.name}</div>}

                          <button type="submit" className="btn btn-outline-success w-25 mx-2">
                            Submit
                          </button>
                          <button type="button" onClick={() => hideEditField("nameEdit", "btnName")} className="btn btn-outline-danger w-25 mx-2">
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="col">
                      <button onClick={() => showEditField("nameEdit", "btnName")} id="btnName" className="btn btn-outline-info w-25">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row row-cols-1 shadow-sm bg-light p-3 m-2">
                    <div className="col">
                      <h6 className="text-start py-2">
                        E-Mail : <span className="text-success">{dataUserEmail ? dataUserEmail : ""}</span>
                      </h6>

                      <div id="mailEdit" style={{ display: "none" }} className="div">
                        <form onSubmit={mailFormik.handleSubmit}>
                          <div className="form-floating mb-3">
                            <input type="e-mail" className="form-control" id="email" name="email" onBlur={mailFormik.handleBlur} onChange={mailFormik.handleChange} value={mailFormik.values.email} placeholder="write new e-mail"/>
                            <label htmlFor="email">write new E-Mail</label>
                          </div>
                          {mailFormik.errors.email && mailFormik.touched.email && <div className="alert alert-danger">{mailFormik.errors.email}</div>}

                          <button type="submit" className="btn btn-outline-success w-25 mx-2">
                            Submit
                          </button>
                          <button type="button" onClick={() => hideEditField("mailEdit", "btnMail")} className="btn btn-outline-danger w-25 mx-2">
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="col">
                      <button onClick={() => showEditField("mailEdit", "btnMail")} id="btnMail" className="btn btn-outline-info w-25">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row row-cols-1 shadow-sm bg-light p-3 m-2">
                    <div className="col">
                      <h6 className="text-start py-2">
                        Phone : <span className="text-success">{dataUserPhone ? dataUserPhone : ""}</span>
                      </h6>

                      <div id="PhoneEdit" style={{ display: "none" }} className="div">
                        <form onSubmit={phoneFormik.handleSubmit}>
                          <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="phoneInput" name="phone" onBlur={phoneFormik.handleBlur} onChange={phoneFormik.handleChange} value={phoneFormik.values.phone} placeholder="write new phone number"/>
                            <label htmlFor="phoneInput">write new phone number</label>
                          </div>
                          {phoneFormik.errors.phone && phoneFormik.touched.phone && <div className="alert alert-danger">{phoneFormik.errors.phone}</div>}

                          <button type="submit" className="btn btn-outline-success w-25 mx-2">
                            Submit
                          </button>
                          <button type="button" onClick={() => hideEditField("PhoneEdit", "btnPhone")} className="btn btn-outline-danger w-25 mx-2">
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="col">
                      <button onClick={() => showEditField("PhoneEdit", "btnPhone")} id="btnPhone" className="btn btn-outline-info w-25">
                        edit
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row row-cols-1 shadow-sm bg-light p-3 m-2">
                    <div className="col">
                      <h6 className="text-start">Password :</h6>
                    </div>

                    <div id="passwordEdit" style={{ display: "none" }} className="div">
                      <form onSubmit={passwordFormik.handleSubmit}>
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control my-2" id="currentPassword" name="currentPassword" value={passwordFormik.values.currentPassword} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} placeholder="current Password"/>
                          <label htmlFor="currentPassword">current Password</label>
                        </div>
                        {passwordFormik.errors.currentPassword && passwordFormik.touched.currentPassword && <div className="alert alert-danger">{passwordFormik.errors.currentPassword}</div>}

                        <div className="form-floating mb-3">
                          <input type="password" className="form-control my-2" id="password" name="password" value={passwordFormik.values.password} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} placeholder="Password"/>
                          <label htmlFor="password">Password</label>
                        </div>
                        {passwordFormik.errors.password && passwordFormik.touched.password && <div className="alert alert-danger">{passwordFormik.errors.password}</div>}

                        <div className="form-floating mb-3">
                          <input type="password" className="form-control my-2" id="rePassword" name="rePassword" value={passwordFormik.values.rePassword} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} placeholder="rePassword"/>
                          <label htmlFor="rePassword">RePassword</label>
                        </div>
                        {passwordFormik.errors.rePassword && passwordFormik.touched.rePassword && <div className="alert alert-danger">{passwordFormik.errors.rePassword}</div>}

                        <button type="submit" className="btn btn-outline-success w-25 mx-2">
                          Submit
                        </button>
                        <button type="button" onClick={() => hideEditField("passwordEdit", "btnPassword")} className="btn btn-outline-danger w-25 mx-2">
                          Cancel
                        </button>
                      </form>
                    </div>

                    <div className="col">
                      <button onClick={() => showEditField("passwordEdit", "btnPassword")} id="btnPassword" className="btn btn-outline-info w-25">
                        reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="address m-2">
              <table className="table table-light table-striped table-hover shadow-sm mb-3">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="d-none d-lg-table-cell">
                      Name
                    </th>
                    <th scope="col" className="d-none d-lg-table-cell">
                      Phone
                    </th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                  </tr>
                </thead>
                {userAddress === null ? (
                  ""
                ) : (
                  <tbody>
                    {userAddress.map((address, indx) => (
                      <tr key={indx}>
                        <th scope="row">{indx + 1}</th>
                        <td className="d-none d-lg-table-cell">{address.name}</td>
                        <td className="d-none d-lg-table-cell">{address.phone}</td>
                        <td>{address.details}</td>
                        <td>{address.city}</td>
                        <td>
                          <button
                            onClick={() => {
                              removeAddress(address._id);
                            }}
                            className="btn btn-outline-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>

              <div className="vid" id="form" style={{ display: "none" }}>

              <form  onSubmit={addressFormik.handleSubmit}>
                <div className="form-floating mb-3">
                  <select className="form-select" id="cityName" name="name" value={addressFormik.values.name} onBlur={addressFormik.handleBlur} onChange={addressFormik.handleChange} placeholder="city Name">
                    <option>Please Select One</option>
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                    <option value="work">Work</option>
                    <option value="school">School</option>
                  </select>
                  <label htmlFor="cityName">Place Name</label>
                  {addressFormik.errors.name && addressFormik.touched.name && <div className="alert alert-danger">{addressFormik.errors.name}</div> }
                </div>

                <div className="form-floating mb-3">
                  <input type="tel" className="form-control" id="phone" name="phone" value={addressFormik.values.phone} onBlur={addressFormik.handleBlur} onChange={addressFormik.handleChange} placeholder="phone"/>
                  <label htmlFor="phone">Phone</label>
                  {addressFormik.errors.phone && addressFormik.touched.phone && <div className="alert alert-danger">{addressFormik.errors.phone}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="details" name="details" value={addressFormik.values.details} onBlur={addressFormik.handleBlur} onChange={addressFormik.handleChange} placeholder="details"/>
                  <label htmlFor="details">Address</label>
                  {addressFormik.errors.details && addressFormik.touched.details && <div className="alert alert-danger">{addressFormik.errors.details}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="city" name="city" value={addressFormik.values.city} onBlur={addressFormik.handleBlur} onChange={addressFormik.handleChange} placeholder="city"/>
                  <label htmlFor="city">City</label>
                  {addressFormik.errors.city && addressFormik.touched.city && <div className="alert alert-danger">{addressFormik.errors.city}</div>}
                </div>

                <button type="submit" className="btn btn-success w-25 mx-2"> Submit </button>

                <button type="button" onClick={() => hideEditField("form", "add")} className="btn btn-danger w-25 mx-2"> Cancel </button>
              </form>

              </div>
              <button type="button" onClick={() => showEditField("form", "add")} id="add" className="btn btn-success w-25"> Add Address </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
