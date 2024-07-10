import React from "react";
import { useAuth } from "./contexts/authContext";
import App from "./App";

const Main = () => {
  const { loggedIn, currentUserDB } = useAuth();
  console.log("LoggedIn", loggedIn);
  if (loggedIn && currentUserDB) return <App />;
  return <div>Bienvenue, veuillez vous connecter</div>;
};

export default Main;
