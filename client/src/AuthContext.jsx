import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);
    setUser({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  const isAdmin = () => user?.role === "Admin";
  const isAgent = () => user?.role === "Agent";
  const isCustomer = () => user?.role === "Customer";

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAdmin, isAgent, isCustomer }}
    >
      {children}
    </AuthContext.Provider>
  );
};
