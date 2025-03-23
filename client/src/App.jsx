import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ProductPage from "./components/Product/ProductPage";
import SignIn from "./components/Authentication/SignIn";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Common/Dashboard";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.css"

const App = () => (
  <Router>
    <AuthProvider>
      <ToastContainer />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/*" element={<ProductPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
