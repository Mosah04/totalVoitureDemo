import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext.js";

import "./index.css";
import "./config/firebase-config.js";

import router from "./routes/router.js";
import { LayoutContextProvider } from "./contexts/layoutContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LayoutContextProvider>
        <RouterProvider router={router} />
      </LayoutContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
