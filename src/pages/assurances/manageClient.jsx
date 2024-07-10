import React, { useState } from "react";
import AssuranceOfferView from "../../components/assuranceOffer";
import { IoClose } from "react-icons/io5";
import TButton from "../../components/TButton";
import { Link } from "react-router-dom";

const ShowAssuranceOffers = ({ offers }) => {
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedOffer, setSelectedAssuranceOffer] = useState(null);

  const toggleViewMode = (devis) => {
    setSelectedAssuranceOffer(devis);
    setIsViewMode(!isViewMode);
  };

  return (
    <div>
      <h2 className="text-font-bold font-bold text-center">
        Les offres d'assurances concoctées pour vous!
      </h2>
      {offers.length <= 0 && (
        <p className="text-center">
          Aucune offre n'a été proposées pour l'instant. Veuillez patienter!
        </p>
      )}
      {offers.length > 0 && (
        <>
          <p className="text-center">
            Quelques offres ont proposées pour vous!
          </p>
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
                  Compagnie
                </th>
                <th scope="col" className="px-4 py-3">
                  Type de couverture
                </th>
                <th scope="col" className="px-4 py-3">
                  Nombre d'options
                </th>
                <th scope="col" className=""></th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr
                  key={offer._id}
                  className="border-b transition-hover duration-300 hover:bg-white"
                >
                  <td className="px-4 py-2">
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                      {offer._id}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                      {offer.compagnie}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                      <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                        {offer.typeCouverture}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                      {offer.optionsPaiement.length}
                    </span>
                  </td>
                  {/* <td className="px-4 py-2">
                    <span
                      className={`bg-primary-100 text-xs font-medium px-2 py-0.5 ${
                        offer.statut === "accepté"
                          ? "text-green-500"
                          : offer.statut === "refusé"
                          ? "text-secondary"
                          : "text-yellow-500"
                      }`}
                    >
                      {offer.statut[0].toUpperCase() + offer.statut.slice(1)}
                    </span>
                  </td> */}
                  <td>
                    <div className="flex justify-center gap-4 px-2">
                      <button
                        onClick={() => {
                          toggleViewMode(offer);
                        }}
                        className="bg-primary-100 text-xs font-medium px-2 py-0.5 hover:text-primary hover:underline"
                      >
                        Voir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full pt-4 flex">
            <Link to={"subscriptions"} className="inline-block ml-auto">
              <TButton className="min-w-fit py-2 px-4 ">
                Voir mes souscriptions
              </TButton>
            </Link>
          </div>
        </>
      )}

      {isViewMode && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-gray-800 bg-opacity-50 flex flex-col gap-2 justify-center items-center">
          <button
            type="button"
            onClick={() => {
              setIsViewMode(false);
            }}
            className="text-white font-bold text-2xl p-2 border-2 border-white"
          >
            <IoClose />
          </button>
          <AssuranceOfferView assuranceOffer={selectedOffer} />
        </div>
      )}
    </div>
  );
};

export default ShowAssuranceOffers;
