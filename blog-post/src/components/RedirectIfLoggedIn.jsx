import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfLoggedIn = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (user) {
    console.log("RedirectIfLoggedIn: User logged in, redirecting to /post");
    return <Navigate to="/post" replace />;
  }

  return children;
};

export default RedirectIfLoggedIn;
