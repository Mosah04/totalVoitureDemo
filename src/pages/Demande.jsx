import React from "react";
import { Outlet } from "react-router-dom";

const Demande = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl text-font-bold font-bold">
        Demandes d'importation
      </h1>
      <div className="w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default Demande;
