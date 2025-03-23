import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <Link to="/" className="navbar-brand">
        <img
          src="https://st2.depositphotos.com/4035913/6124/i/450/depositphotos_61243733-stock-illustration-business-company-logo.jpg"
          alt="Logo"
          width="100"
          height="50"
          className="d-inline-block align-top rounded"
        />
      </Link>
      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/" className="text-white text-decoration-none">
            Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/product" className="text-white text-decoration-none">
            Product
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
