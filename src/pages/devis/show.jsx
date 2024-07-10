import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const DevisShow = () => {
  const { devis } = useLoaderData();
  console.log(devis);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="bg-white rounded-xl shadow-md min-w-[400px]">
        <p className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg justify-center">
          Devis n° {devis._id}
        </p>
        <ul className="p-2 space-y-1">
          <li className="flex justify-between">
            <span className="flex items-center">Auteur</span>
            <span className="text-font-bold font-bold">
              {devis?.user?.prenoms + " " + devis?.user?.nom}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center">Date de publication</span>
            <span className="text-font-bold font-bold">
              {new Date(devis.createdAt).toLocaleDateString()}
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
            {devis.services.map((service, index) => (
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
          <li className="flex justify-between mt-2">
            <span className="flex items-center">Montant total</span>
            <span className="text-font-bold font-bold">
              {new Intl.NumberFormat("bj-BJ", {
                style: "currency",
                currency: "XOF",
              }).format(
                devis.services.reduce((acc, service) => {
                  return acc + service.prix * service.quantite;
                }, 0)
              )}
            </span>
          </li>
          <li className="flex justify-between mt-2">
            <span className="flex items-center">Conditions de paiement</span>
            <span className="text-font-bold font-bold">
              50% à la commande, solde à la fin de la prestation
            </span>
          </li>
          <li className="flex justify-between mt-2 gap-2">
            <span className="flex items-center">Délai</span>
            <span className="text-font-bold font-bold">
              {devis.delai} jours à compter de la réception des documents
              complets
            </span>
          </li>
        </ul>
      </div>
      <div className="min-w-[400px] flex justify-center">
        {/* <Link to={"/devis/create"} state={{ idDemande: demande._id }}>
      <TButton className="min-w-fit py-2 px-4">Je propose un devis</TButton>
    </Link> */}
      </div>
    </div>
  );
};

export default DevisShow;
