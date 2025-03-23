import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🟢 New loading state

  useEffect(() => {
    const data = localStorage.getItem("Auth");
    if (data) {
      setUser(JSON.parse(data));
    }
    setLoading(false); // ✅ Hydration done
  }, []);

  const logout = () => {
    localStorage.removeItem("Auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
