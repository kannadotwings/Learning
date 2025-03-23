import React from "react";
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3" style={{ height: "80px" }}>
      <Link to="/" className="navbar-brand">
        <img
          src="https://st2.depositphotos.com/4035913/6124/i/450/depositphotos_61243733-stock-illustration-business-company-logo.jpg"
          alt="Logo"
          width="100"
          height="50"
          className="d-inline-block align-top rounded"
        />
      </Link>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/product/list" className="nav-link">
              Products
            </Link>
          </li>
          {user && (
            <li className="nav-item ms-3">
              <button
                className="btn btn-outline-danger d-flex align-items-center"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
