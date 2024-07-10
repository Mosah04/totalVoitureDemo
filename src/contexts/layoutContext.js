import React, { useState, useContext, createContext } from "react";

const LayoutContext = createContext();

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export const LayoutContextProvider = ({ children }) => {
  const [sideVisible, setSideVisible] = useState(false);
  return (
    <LayoutContext.Provider value={{ sideVisible, setSideVisible }}>
      {children}
    </LayoutContext.Provider>
  );
};
