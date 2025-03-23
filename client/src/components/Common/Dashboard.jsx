import React from "react";
import { useAuth } from "../../utils/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="page">
    <p>Welcome {user ? user.name : "user"}</p>
  </div>
  )

};

export default Dashboard;
