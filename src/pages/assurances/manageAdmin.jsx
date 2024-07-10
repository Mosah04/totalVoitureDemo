import React from "react";
import { Link } from "react-router-dom";

const { REACT_APP_BACKEND_URL } = process.env;

const ShowAssuranceRequests = ({ requests }) => {
  return (
    <div>
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
              Carte grise
            </th>
            <th scope="col" className="px-4 py-3">
              Carte d'identité
            </th>
            <th scope="col" className="px-4 py-3">
              Date de création
            </th>
            <th scope="col" className="px-4 py-3">
              Etat
            </th>
            <th scope="col" className=""></th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 &&
            requests.map((request, index) => (
              <tr
                key={request._id}
                className="border-b transition-hover duration-300 hover:bg-white"
              >
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {request._id}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <Link
                    to={`${REACT_APP_BACKEND_URL}/carteGrise/${request.idInfosClient.carteGriseVoiture}`}
                    rel="noopener noreferrer"
                  >
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5 text-primary hover:underline">
                      Voir
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    <Link
                      to={`${REACT_APP_BACKEND_URL}/carteIdentite/${request.idInfosClient.carteIdentite}`}
                      rel="noopener noreferrer"
                    >
                      <span className="bg-primary-100 text-xs font-medium px-2 py-0.5 text-primary hover:underline">
                        Voir
                      </span>
                    </Link>
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`bg-primary-100 text-xs font-medium px-2 py-0.5 ${
                      request.status === "proposé"
                        ? "text-green-500"
                        : request.status === "refusé"
                        ? "text-secondary"
                        : "text-yellow-500"
                    }`}
                  >
                    {request.status[0].toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-4 px-2">
                    <Link
                      to={`/assurances/offres/create`}
                      state={{ idDemande: request._id }}
                      rel="noopener noreferrer"
                    >
                      <span className="bg-primary-100 text-xs font-medium px-2 py-0.5 hover:text-primary hover:underline">
                        Proposer une offre d'assurance
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowAssuranceRequests;
