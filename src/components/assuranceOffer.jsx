import React, { useState } from "react";
import TButton from "./TButton";

const AssuranceOfferView = ({ assuranceOffer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const isOptionSelected = (index) => selectedOption === index;
  console.log(assuranceOffer);
  return (
    <div>
      <div className="bg-white rounded-xl shadow-md min-w-[400px] relative">
        <h2 className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg justify-center">
          Offre d'assurance
        </h2>
        <ul className="p-2 space-y-1">
          <li className="flex justify-between">
            <span className="flex items-center">Compagnie</span>
            <span className="text-font-bold font-bold">
              {assuranceOffer.compagnie}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center">Type de couverture</span>
            <span className="text-font-bold font-bold">
              {assuranceOffer.typeCouverture}
            </span>
          </li>
        </ul>
        <p className="text-center text-font-bold font-bold">Description</p>
        <p className="text-justify px-2">{assuranceOffer.description}</p>
        <p className="text-center text-font-bold font-bold">
          Options de paiement
        </p>
        <div className="px-2">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-font-bold uppercase border-y-2 border-y-line">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Durée en mois
                </th>
                <th scope="col" className="px-4 py-3">
                  Prime
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {assuranceOffer.optionsPaiement.map((optionPaiement, index) => (
                <tr
                  key={index}
                  className={`border-b transition-hover duration-300 ${
                    isOptionSelected(index) ? "bg-primary/50" : ""
                  }`}
                >
                  <td className="px-4 py-2">
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                      {optionPaiement.dureeMois}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                      {new Intl.NumberFormat("bj-BJ", {
                        style: "currency",
                        currency: "XOF",
                      }).format(optionPaiement.prime)}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        !isOptionSelected(index) && setSelectedOption(index);
                      }}
                      className={`bg-primary-100 text-xs font-medium px-2 py-0.5 ${
                        isOptionSelected(index) ||
                        "hover:underline hover:text-primary"
                      }`}
                    >
                      {!isOptionSelected(index)
                        ? "Choisir cette offre"
                        : "Offre Choisie"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-2 flex justify-center">
        <TButton
          className="min-w-fit py-2 px-4"
          //   onClick={chooseDevisHandler(selectedDevis._id)}
        >
          Souscrire à cette offre
        </TButton>
      </div>
    </div>
  );
};

export default AssuranceOfferView;
