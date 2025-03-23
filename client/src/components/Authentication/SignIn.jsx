import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { login } from "../../Service/authenticationService";
import { useAuth } from "../../utils/AuthContext";
const SignIn = () => {
  const navigate = useNavigate();
  const { setUser} = useAuth()
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true);
  
      const requestData = {
        email: values.email,
        password: values.password,
      };
  
      console.log("requestData-value", requestData);
  
      login(requestData)
        .then((Response) => {
          if (Response?.status === true) {
            localStorage.setItem("Auth", JSON.stringify(Response.data));
            setUser(Response.data)
            navigate("/");
            toast.success(Response?.message, { autoClose: 6000 });
          } else {
            toast.error(Response?.message || "Login failed", { autoClose: 6000 });
          }
        })
        .catch((error) => {
          console.error("error occured", error);
          toast.error(error.response.data.message || "Something went wrong", { autoClose: 6000 });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label required">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label required">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 mb-2"
          >
            Sign In
          </button>
        </form>
      </div>
         
    </div>
  );
};

export default SignIn;
