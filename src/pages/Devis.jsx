import React from "react";
import { Outlet } from "react-router-dom";

const Devis = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl text-font-bold font-bold">Devis</h1>
      <div className="w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default Devis;
