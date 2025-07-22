// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setauthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setauthToken(token);
      setUser(JSON.parse(userData));
      setisAuthenticated(true);
    } else {
      setauthToken(null);
      setUser(null);
      setisAuthenticated(false);
    }

    setisLoading(false);
  }, []);

  const login = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setauthToken(token);
    setUser(user);
    setisAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setauthToken(null);
    setUser(null);
    setisAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
