import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const AssuranceIndex = () => {
  const {
    currentUser: { uid },
  } = useAuth();
  return <Navigate to={`user/${uid}`} />;
};

export default AssuranceIndex;
