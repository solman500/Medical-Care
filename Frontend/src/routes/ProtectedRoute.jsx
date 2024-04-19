import React from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ childern, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  const isAllowed = allowedRoles.includes(role);

  const accessibleRoute = token && isAllowed ? childern : <Navigate to="/login" replace={true} />;
     
  return accessibleRoute;
};

export default ProtectedRoute;
