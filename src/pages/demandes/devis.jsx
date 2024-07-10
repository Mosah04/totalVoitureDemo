import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { useLoaderData, useParams, useFetcher } from "react-router-dom";
import TButton from "../../components/TButton";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../contexts/authContext";

const DemandeDevis = () => {
  const { devis: devisInitial } = useLoaderData();
  const [devis, setDevis] = useState(devisInitial);
  const { currentUser } = useAuth();
  const { REACT_APP_BACKEND_URL } = process.env;
  const fetcher = useFetcher();

  const { demandeId } = useParams();

  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedDevis, setSelectedDevis] = useState(null);

  const toggleViewMode = (devis) => {
    setSelectedDevis(devis);
    setIsViewMode(!isViewMode);
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      const { devis: devisFetched } = fetcher.data;
      setDevis(devisFetched);
    }
  }, [fetcher.data]);

  const chooseDevisHandler = (idDevis) => {
    return async () => {
      try {
        toast.loading(`Choix du devis en cours`);
        const token = await currentUser.getIdToken(true);
        const response = await fetch(
          `${REACT_APP_BACKEND_URL}/devis/${idDevis}/choose`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          toast.error(`Erreur lors du choix du devis!`);
          return;
        }
        toast.success(`Devis choisi avec succès!`);
        fetcher.load();

        setIsViewMode(false);
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors du choix du devis!");
      }
    };
  };
  return (
    <div>
      <Toaster
        containerClassName="text-center"
        toastOptions={{ duration: 4000 }}
      />
      <h1 className="text-lg text-font-bold font-bold">
        Devis proposés pour la demande {demandeId}
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-white uppercase bg-primary">
          <tr>
            <th scope="col" className="px-4 py-3">
              N°
            </th>
            <th scope="col" className="px-4 py-3">
              Id
            </th>
            <th scope="col" className="px-4 py-3">
              Nombre de services
            </th>
            <th scope="col" className="px-4 py-3">
              Cout total
            </th>
            <th scope="col" className="px-4 py-3">
              Date de soumission
            </th>

            <th scope="col" className="px-4 py-3">
              <span className="block text-center">Action</span>
            </th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {devis.length > 0 &&
            devis.map((devi, index) => (
              <tr
                key={devi._id}
                className="border-b transition-hover duration-300 hover:bg-white"
              >
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {devi._id}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {devi.services.length}
                  </span>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {new Intl.NumberFormat("bj-BJ", {
                      style: "currency",
                      currency: "XOF",
                    }).format(devi.cout)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {new Date(devi.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-4 px-2">
                    <button type="button" onClick={() => toggleViewMode(devi)}>
                      <FaRegEye
                        title="Voir"
                        className="transition-hover duration-300 hover:text-green-500"
                      />
                    </button>
                  </div>
                </td>
                <td>
                  <div
                    className={`flex justify-center gap-4 px-2 ${
                      devi.statut === "accepté" && "text-green-500"
                    } ${devi.statut === "refusé" && "text-secondary"}`}
                  >
                    {devi.statut[0].toUpperCase() + devi.statut.slice(1)}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {devis.length <= 0 && (
        <div className="text-center w-full mt-2">
          Aucun devis n'a encore été proposé pour votre demande. Veuillez
          patienter, les bonnes choses prennent du temps, dit-on!
        </div>
      )}

      {isViewMode && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-gray-800 bg-opacity-50 flex flex-col gap-2 justify-center items-center">
          <div className="bg-white rounded-xl shadow-md min-w-[400px] relative">
            <button
              type="button"
              onClick={() => {
                setIsViewMode(false);
              }}
              className="absolute -top-10 -right-10 text-white font-bold text-2xl p-2 border-2 border-white"
            >
              <IoClose />
            </button>
            <p className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg justify-center">
              Devis n° {selectedDevis._id}
            </p>
            <ul className="p-2 space-y-1">
              <li className="flex justify-between">
                <span className="flex items-center">Auteur</span>
                <span className="text-font-bold font-bold">
                  {selectedDevis?.user?.prenoms +
                    " " +
                    selectedDevis?.user?.nom}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">Date de publication</span>
                <span className="text-font-bold font-bold">
                  {new Date(selectedDevis.createdAt).toLocaleDateString()}
                </span>
              </li>
            </ul>
            <p className="text-center text-font-bold font-bold">
              Services proposés
            </p>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-primary">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantité
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Prix unitaire
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedDevis.services.map((service, index) => (
                  <tr
                    key={index}
                    className="border-b transition-hover duration-300 hover:bg-white"
                  >
                    <td className="px-4 py-2">
                      <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                        {service.description}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                        {service.quantite}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                        {new Intl.NumberFormat("bj-BJ", {
                          style: "currency",
                          currency: "XOF",
                        }).format(service.prix)}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                      <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                        {new Intl.NumberFormat("bj-BJ", {
                          style: "currency",
                          currency: "XOF",
                        }).format(service.prix * service.quantite)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="p-2 space-y-1">
              <li className="flex justify-between mt-2 gap-5">
                <span className="flex items-center">Montant total</span>
                <span className="text-font-bold font-bold">
                  {new Intl.NumberFormat("bj-BJ", {
                    style: "currency",
                    currency: "XOF",
                  }).format(
                    selectedDevis.services.reduce((acc, service) => {
                      return acc + service.prix * service.quantite;
                    }, 0)
                  )}
                </span>
              </li>
              <li className="flex justify-between mt-2 gap-5">
                <span className="flex items-center">
                  Conditions de paiement
                </span>
                <span className="text-font-bold font-bold">
                  50% à la commande, solde à la fin de la prestation
                </span>
              </li>
              <li className="flex justify-between mt-2 gap-5">
                <span className="flex items-center">Délai</span>
                <span className="text-font-bold font-bold">
                  {selectedDevis.delai} jours à compter de la réception des
                  documents complets
                </span>
              </li>
            </ul>
          </div>
          {/* {selectedDevis.statut === "en attente" && ( */}
          <div className="min-w-[400px] flex justify-center">
            <TButton
              className="min-w-fit py-2 px-4"
              onClick={chooseDevisHandler(selectedDevis._id)}
            >
              Je choisis ce devis
            </TButton>
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
};

export default DemandeDevis;
