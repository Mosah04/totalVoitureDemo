import React from "react";
import { Navigate, redirect } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const DevisIndex = () => {
  const {
    currentUser: { uid },
  } = useAuth();
  redirect(`user/${uid}`);
  return <Navigate to={`user/${uid}`} />;
};

export default DevisIndex;
