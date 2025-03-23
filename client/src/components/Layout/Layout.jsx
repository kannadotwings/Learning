import React from "react";
import Header from "../Common/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" />;

  return (
    <div>
      {/* Top Header */}
      <Header />

      {/* Main content */}
      <div style={{ padding: "20px", background: "#f8f9fa", minHeight: "calc(100vh - 80px)" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
