import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // User is NOT authenticated and is trying to access protected routes
  const isPublicRoute =
    location.pathname.includes("/login") || location.pathname.includes("/register");

  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to="/auth/login" replace />;
  }

  // User IS authenticated and is on login/register page — redirect based on role
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"} replace />;
  }

  // Prevent non-admin users from accessing admin routes
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Prevent admin users from accessing shop routes
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Everything is okay, allow access to the children
  return <>{children}</>;
}

export default CheckAuth;
