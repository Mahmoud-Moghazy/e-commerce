import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import $ from "jquery";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

  const navigate = useNavigate();

  const forgotPassword = async (value) => {
    try {
      const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords", value);
      if (data.statusMsg === "success") {
        $("#ForgotPassword").fadeOut(1000, () => {
          $("#ResetCode").fadeIn(1000);
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const verifyResetCode = async (code) => {
    try {
      const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode", { resetCode: code });
      if (data.status === "Success") {
        $("#ResetCode").fadeOut(1000, () => {
          $("#resetPassword").fadeIn(1000);
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      const { data } = await axios.put("https://route-ecommerce.onrender.com/api/v1/auth/resetPassword", { email, newPassword });
      if (data.token) {
        toast.success("You have reset your password successfully");
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const validation = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid!"),
  });

  const mailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: forgotPassword,
  });

  //? password Validation
  const passwordValidation = Yup.object({
    password: Yup.string().required("Password is required").matches(/^[a-z0-9]{5,10}$/i, "Password must include characters with length from 5 to 10 chars"),
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordValidation,
  });

  return (
    <>
      <div className="container py-5">
        <div className="forgot text-center">
          <h2>ForgotPassword</h2>

          <div id="ForgotPassword" className="ForgotPassword w-50 m-auto my-4">
            <form onSubmit={mailFormik.handleSubmit}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" name="email" onBlur={mailFormik.handleBlur} onChange={mailFormik.handleChange} value={mailFormik.values.email} placeholder="write new e-mail" />
                <label htmlFor="email">Write your email</label>
              </div>
              {mailFormik.errors.email && mailFormik.touched.email && <div className="alert alert-danger">{mailFormik.errors.email}</div>}

              <button type="submit" className="btn btn-outline-success w-25 mx-2">Submit</button>
            </form>
          </div>

          <div id='ResetCode' className="resetCode w-50 m-auto my-4" style={{ display: "none" }}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="resetCodeInput" placeholder="name@example.com" />
              <label htmlFor="resetCodeInput">Reset code</label>
            </div>
            <button onClick={() => verifyResetCode($("#resetCodeInput").val())} type="button" className="btn btn-outline-success w-25 mx-2">Submit</button>
          </div>

          <div id="resetPassword" className="resetPassword w-50 m-auto my-4" style={{ display: "none" }}>
            <form>

              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="resetEmail" name="email" onBlur={mailFormik.handleBlur} onChange={mailFormik.handleChange} value={mailFormik.values.email} placeholder="write new e-mail" />
                <label htmlFor="resetEmail">Write your email</label>
              </div>
              {mailFormik.errors.email && mailFormik.touched.email && <div className="alert alert-danger">{mailFormik.errors.email}</div>}

              <div className="form-floating mb-3">
                <input type="password" className="form-control my-2" id="password" name="password" value={passwordFormik.values.password} onChange={passwordFormik.handleChange} onBlur={passwordFormik.handleBlur} placeholder="Password" />
                <label htmlFor="password">New Password</label>
              </div>
              {passwordFormik.errors.password && passwordFormik.touched.password && <div className="alert alert-danger">{passwordFormik.errors.password}</div>}

              <button onClick={() => resetPassword($("#resetEmail").val(), $("#password").val())} type="button" className="btn btn-outline-success w-25 mx-2">Submit</button>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}