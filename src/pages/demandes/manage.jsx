import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaRegEye, FaTrashAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { useLoaderData, Link, useFetcher } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import confirm from "../../components/Confirmation";

const DemandeManage = () => {
  const { demandes: demandesInitial } = useLoaderData();
  const [demandes, setDemandes] = useState(demandesInitial);
  const { currentUser, currentUserDB } = useAuth();
  const { REACT_APP_BACKEND_URL } = process.env;
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      console.log("Ici ooooh");
      const { demandes: demandesFetched } = fetcher.data;
      setDemandes(demandesFetched);
    }
  }, [fetcher.data]);

  const handleOnDeleteClick = (id) => {
    return async () => {
      if (await confirm("Voulez-vous vraiment supprimer cette annonce?")) {
        try {
          toast.loading("Suppression en cours");
          const token = await currentUser.getIdToken(true);
          const response = await fetch(
            `${REACT_APP_BACKEND_URL}/demandes/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) {
            console.log(response.status);
            toast.error("Erreur lors de la suppresion!");
            return;
          }
        } catch (error) {
          console.log(error);
          if (
            error.message === "Firebase: Error (auth/network-request-failed)."
          )
            toast.error("Erreur de connexion!");
          else toast.error("Erreur lors de la suppresion!");
          return;
        }
        toast.success("Suppresion réussie!");
        if (fetcher.state === "idle") {
          fetcher.load();
        }
      } else {
        console.log("No");
      }
    };
  };
  return (
    <div>
      <Toaster
        containerClassName="text-center"
        toastOptions={{ duration: 4000 }}
      />
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
              Modèle
            </th>
            <th scope="col" className="px-4 py-3">
              N° de chassis
            </th>
            <th scope="col" className="px-4 py-3">
              Date de publication
            </th>
            <th scope="col" className="px-4 py-3">
              Etat
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="block text-center">Actions</span>
            </th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {demandes.length > 0 &&
            demandes.map((demande, index) => (
              <tr
                key={demande._id}
                className="border-b transition-hover duration-300 hover:bg-white"
              >
                <td className="px-4 py-2">
                  <span className="text-xs font-medium px-2 py-0.5">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-xs font-medium px-2 py-0.5">
                    {demande._id}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <span className="text-xs font-medium px-2 py-0.5">
                    {demande.detailsVehicule.modele}
                  </span>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  <span className="text-xs font-medium px-2 py-0.5">
                    {demande.detailsVehicule.chassis}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="text-xs font-medium px-2 py-0.5">
                    {new Date(demande.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 ${
                      demande.statut === "finalisé"
                        ? "text-green-500"
                        : demande.statut === "rejeté"
                        ? "text-secondary"
                        : "text-yellow-500"
                    }`}
                  >
                    {demande.statut[0].toUpperCase() + demande.statut.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-4 px-2">
                    <Link to={`/importations/show/${demande._id}`}>
                      <FaRegEye
                        title="Voir"
                        className="transition-hover duration-300 hover:text-green-500"
                      />
                    </Link>
                    <Link to={`/importations/${demande._id}/edit`}>
                      <HiOutlinePencil
                        title="Modifier"
                        className="transition-hover duration-300 hover:text-yellow-500"
                      />
                    </Link>
                    <FaTrashAlt
                      title="Supprimer"
                      className="transition-hover duration-300 hover:text-secondary"
                      onClick={handleOnDeleteClick(demande._id)}
                    />
                  </div>
                </td>
                <td>
                  <Link to={`/importations/${demande._id}/devis`}>
                    <span className="text-xs font-medium px-2 py-0.5 hover:text-primary hover:underline">
                      Voir les devis proposés
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {demandes.length <= 0 && (
        <div className="text-center w-full mt-2">
          Aucune demande trouvée! Voulez-vous en poster?{" "}
          <span className="text-primary underline">
            <Link to={"/importations/create"}>C'est par ici.</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default DemandeManage;
