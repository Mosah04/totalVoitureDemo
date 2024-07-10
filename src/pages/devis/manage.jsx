import React, { useState, useEffect } from "react";
import { Link, useLoaderData, useFetcher } from "react-router-dom";
import { FaRegEye, FaTrashAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { useAuth } from "../../contexts/authContext";
import confirm from "../../components/Confirmation";
import { Toaster, toast } from "react-hot-toast";

const DevisManage = () => {
  const { devis: devisInitial } = useLoaderData();
  const [devis, setDevis] = useState(devisInitial);
  const { currentUser, currentUserDB } = useAuth();
  const { REACT_APP_BACKEND_URL } = process.env;
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      const { devis: devisFetched } = fetcher.data;
      setDevis(devisFetched);
    }
  }, [fetcher.data]);

  const handleOnDeleteClick = (id) => {
    return async () => {
      if (await confirm("Voulez-vous vraiment supprimer ce devis?")) {
        try {
          toast.loading("Suppression en cours");
          const token = await currentUser.getIdToken(true);
          const response = await fetch(`${REACT_APP_BACKEND_URL}/devis/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            toast.error("Erreur lors de la suppression!");
            return;
          }
          toast.success("Suppression réussie!");
          if (fetcher.state === "idle") {
            fetcher.load();
          }
        } catch (error) {
          console.log(error);
          toast.error("Erreur lors de la suppression!");
        }
      }
    };
  };

  const handleValidationClick = (id, isValid) => {
    return async () => {
      try {
        toast.loading(`${isValid ? "Invalidation" : "Validation"}  en cours`);
        const token = await currentUser.getIdToken(true);
        const response = await fetch(
          `${REACT_APP_BACKEND_URL}/devis/${id}/validate`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          toast.error(
            `Erreur lors de ${
              isValid ? "l'invalidation" : "la validation"
            } du devis!`
          );
          return;
        }
        toast.success(`Devis ${isValid ? "invalidé" : "validé"} avec succès!`);
        // if (fetcher.state === "idle") {
        fetcher.load();
        // }
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la validation du devis!");
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
              Id demande
            </th>
            <th scope="col" className="px-4 py-3">
              Cout total
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
            {currentUserDB.isAdmin && <th scope="col" className=""></th>}
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
                  <Link to={`/importations/show/${devi.idDemande}`}>
                    <span className="bg-primary-100 text-xs font-medium px-2 py-0.5 text-primary hover:underline">
                      {devi.idDemande}
                    </span>
                  </Link>
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
                <td className="px-4 py-2">
                  <span
                    className={`bg-primary-100 text-xs font-medium px-2 py-0.5 ${
                      devi.statut === "accepté"
                        ? "text-green-500"
                        : devi.statut === "refusé"
                        ? "text-secondary"
                        : "text-yellow-500"
                    }`}
                  >
                    {devi.statut[0].toUpperCase() + devi.statut.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-4 px-2">
                    <Link to={`/devis/show/${devi._id}`}>
                      <FaRegEye
                        title="Voir"
                        className="transition-hover duration-300 hover:text-green-500"
                      />
                    </Link>
                    <Link to={`/devis/${devi._id}/edit`}>
                      <HiOutlinePencil
                        title="Modifier"
                        className="transition-hover duration-300 hover:text-yellow-500"
                      />
                    </Link>
                    <FaTrashAlt
                      title="Supprimer"
                      className="transition-hover duration-300 hover:text-secondary"
                      onClick={handleOnDeleteClick(devi._id)}
                    />
                  </div>
                </td>
                <td>
                  {currentUserDB.isAdmin && devi.statut === "en attente" && (
                    <button
                      title="Valider"
                      className={`transition-hover duration-300 ${
                        devi.validationAdmin
                          ? "hover:text-secondary"
                          : "hover:text-green-500"
                      } `}
                      onClick={handleValidationClick(
                        devi._id,
                        devi.validationAdmin
                      )}
                    >
                      {devi.validationAdmin ? "Invalider" : "Valider"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {devis.length <= 0 && (
        <div className="text-center w-full mt-2">
          Aucun devis trouvé! Voulez-vous en créer un? Proposez un devis à une
          demande et il s'affichera ici.
        </div>
      )}
    </div>
  );
};

export default DevisManage;
