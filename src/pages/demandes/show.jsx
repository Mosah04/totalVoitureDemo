import React from "react";
import { IoCarSport, IoCalendarOutline } from "react-icons/io5";
import { GoNumber } from "react-icons/go";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useLoaderData, Link } from "react-router-dom";
import TButton from "../../components/TButton";

const DemandeShow = () => {
  const { demande } = useLoaderData();
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="bg-white rounded-xl shadow-md min-w-[400px]">
        <p className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg">
          Informations sur l'importation
        </p>
        <ul className="p-2 space-y-1">
          <li className="flex justify-between">
            <span className="flex items-center">
              <FaLongArrowAltUp className="mr-1" />
              Importé de:
            </span>
            <span className="text-font-bold font-bold">
              {demande.paysDepart}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center">
              <FaLongArrowAltUp className="mr-1 rotate-180" /> Importé vers:
            </span>
            <span className="text-font-bold font-bold">
              {demande.paysArrivee}
            </span>
          </li>
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow-md min-w-[400px]">
        <p className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg">
          Informations sur le véhicule
        </p>
        <ul className="p-2 space-y-1">
          <li className="flex justify-between">
            <span className="flex items-center">
              <IoCarSport className="mr-1" /> Marque
            </span>
            <span className="text-font-bold font-bold">
              {demande.detailsVehicule.marque}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center">
              <IoCarSport className="mr-1" />
              Modèle
            </span>
            <span className="text-font-bold font-bold">
              {demande.detailsVehicule.modele}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center">
              <IoCalendarOutline className="mr-1" /> Année de sortie
            </span>
            <span className="text-font-bold font-bold">
              {demande.detailsVehicule.annee}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center">
              <GoNumber className="mr-1" /> N° de chassis
            </span>
            <span className="text-font-bold font-bold">
              {demande.detailsVehicule.chassis}
            </span>
          </li>
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow-md min-w-[400px]">
        <p className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg">
          Message de l'auteur
        </p>
        {demande.message && (
          <div className="p-2 text-justify">{demande.message}</div>
        )}
      </div>
      <div className="min-w-[400px] flex justify-center">
        <Link to={"/devis/create"} state={{ idDemande: demande._id }}>
          <TButton className="min-w-fit py-2 px-4">Je propose un devis</TButton>
        </Link>
      </div>
    </div>
  );
};

export default DemandeShow;
