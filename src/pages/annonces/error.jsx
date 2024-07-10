import React from "react";
import { useRouteError } from "react-router-dom";

const AnnonceError = () => {
  const error = useRouteError();
  console.log(error);
  return <div>Il y a eu une erreur: {error.message}</div>;
};

export default AnnonceError;
