import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import TButton from "../../components/TButton";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
const DemandeIndex = () => {
  const { demandes } = useLoaderData();
  const {
    currentUser: { uid },
  } = useAuth();
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center space-y-2">
        <form className="max-w-40">
          <select className="bg-gray-50 border border-gray-300  text-sm rounded-full outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5 ">
            <option defaultValue="">Marque de voiture</option>
            <option defaultValue="Toyota">Toyota</option>
            <option defaultValue="Bugatti">Bugatti</option>
            <option defaultValue="Bugatti">Rolls Royce</option>
            <option defaultValue="Bugatti">Ferrari</option>
          </select>
        </form>

        <div className="flex gap-2 justify-center">
          <Link to="create">
            <TButton className="min-w-fit p-2" type="button">
              Publier une demande
            </TButton>
          </Link>
          <Link to={`user/${uid}`}>
            <TButton className="min-w-fit p-2" type="button">
              Gérer mes demandes
            </TButton>
          </Link>
        </div>
      </div>
      <div className="mt-4 containerA">
        {demandes &&
          demandes.map((demande, i) => (
            <div
              key={i}
              className="inline-flex flex-col p-2 rounded-xl bg-white select-none cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-500"
            >
              <Link to={`show/${demande._id}`}>
                <div className="flex justify-between w-full">
                  <div className="w-full">
                    <p className="text-font-bold font-bold line max-w-[97%] truncate">
                      {demande.detailsVehicule.marque +
                        " " +
                        demande.detailsVehicule.modele}
                    </p>
                    <span>{demande.detailsVehicule.annee}</span>
                  </div>
                </div>
                <div className="flex justify-center mb-2">
                  {demande.detailsVehicule.etat[0].toUpperCase() +
                    demande.detailsVehicule.etat.slice(1)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary flex items-center max-w-[47%]">
                    <FaLongArrowAltUp className="flex-shrink-0" />
                    <span className="truncate max-w-[90%]">
                      {demande.paysDepart}
                    </span>
                  </span>
                  <span className="text-primary flex items-center max-w-[47%]">
                    <FaLongArrowAltUp className="rotate-180 flex-shrink-0" />
                    <span className="truncate max-w-[90%]">
                      {demande.paysArrivee}
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default DemandeIndex;
