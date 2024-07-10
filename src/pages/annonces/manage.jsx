import React, { useEffect, useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { useFetcher, useLoaderData, Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import confirm from "../../components/Confirmation";
import { Toaster, toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
const { REACT_APP_BACKEND_URL } = process.env;

const AnnonceManage = () => {
  const { annonces: annoncesInitial } = useLoaderData();
  const [annonces, setAnnonces] = useState(annoncesInitial);
  console.log("Annonces", annonces);
  const fetcher = useFetcher();
  // console.log("DATA", fetcher.data);
  const { currentUser, currentUserDB } = useAuth();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      console.log("Ici ooooh");
      const { annonces: annoncesFetched } = fetcher.data;
      setAnnonces(annoncesFetched);
    }
  }, [fetcher.data]);

  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedVehicule, setSelectedVehicule] = useState(null);
  const toggleViewMode = (vehicule) => {
    setSelectedVehicule(vehicule);
    setIsViewMode(!isViewMode);
  };
  const camelCaseToNormalText = (str) => {
    const result = str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insère un espace entre une lettre minuscule suivie d'une lettre majuscule
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // Insère un espace entre deux majuscules si suivies par une minuscule

    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const handleValidationClick = (id, isValid) => {
    return async () => {
      try {
        toast.loading(`${isValid ? "Invalidation" : "Validation"} en cours`);
        const token = await currentUser.getIdToken(true);
        const response = await fetch(
          `${REACT_APP_BACKEND_URL}/annonces/${id}/validate`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          toast.error(
            `Erreur lors de ${
              isValid ? "l'invalidation" : "la validation"
            } de l'annonce!`
          );
          return;
        }
        toast.success(
          `Annonce ${isValid ? "invalidée" : "validée"} avec succès!`
        );

        fetcher.load();
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la validation de l'annonce!");
      }
    };
  };

  const handleOnDeleteClick = (id) => {
    return async () => {
      console.log("hoge!");
      if (await confirm("Voulez-vous vraiment supprimer cette annonce?")) {
        try {
          toast.loading("Suppression en cours");
          const token = await currentUser.getIdToken(true);
          const response = await fetch(
            `${REACT_APP_BACKEND_URL}/annonces/${id}`,
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
          toast.error("Erreur lors de la suppresion!");
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
              Prix
            </th>
            <th scope="col" className="px-4 py-3">
              Date de publication
            </th>
            <th scope="col" className="px-4 py-3">
              Validation
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="block text-center">Actions</span>
            </th>
            {currentUserDB.isAdmin && <th scope="col" className=""></th>}
            {currentUserDB.isAdmin && <th scope="col" className=""></th>}
          </tr>
        </thead>
        <tbody>
          {annonces.length > 0 &&
            annonces.map((annonce, index) => (
              <tr
                key={annonce._id}
                className="border-b transition-hover duration-300 hover:bg-white"
              >
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {index + 1}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {annonce._id}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {annonce.detailsVehicule.modele}
                  </span>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {Intl.NumberFormat("bj-BJ", {
                      style: "currency",
                      currency: "XOF",
                    }).format(annonce.prixVehicule)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="bg-primary-100 text-xs font-medium px-2 py-0.5">
                    {new Date(annonce.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`bg-primary-100 text-xs font-medium px-2 py-0.5 ${
                      annonce.validationAdmin
                        ? "text-green-500"
                        : "text-secondary"
                    }`}
                  >
                    {annonce.validationAdmin ? "Validée" : "Non validée"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-4 px-2">
                    <Link to={`/annonces/${annonce._id}`}>
                      <FaRegEye
                        title="Voir"
                        className="transition-hover duration-300 hover:text-green-500"
                      />
                    </Link>
                    <Link to={`/annonces/${annonce._id}/edit`}>
                      <HiOutlinePencil
                        title="Modifier"
                        className="transition-hover duration-300 hover:text-yellow-500"
                      />
                    </Link>
                    <FaTrashAlt
                      title="Supprimer"
                      className="transition-hover duration-300 hover:text-secondary"
                      onClick={handleOnDeleteClick(annonce._id)}
                    />
                  </div>
                </td>
                {currentUserDB.isAdmin && (
                  <td>
                    <button
                      title="Valider"
                      className={`transition-hover duration-300 ${
                        annonce.validationAdmin
                          ? "hover:text-secondary"
                          : "hover:text-green-500"
                      } `}
                      onClick={handleValidationClick(
                        annonce._id,
                        annonce.validationAdmin
                      )}
                    >
                      {annonce.validationAdmin ? "Invalider" : "Valider"}
                    </button>
                  </td>
                )}
                {currentUserDB.isAdmin && (
                  <td>
                    <button
                      title="Valider"
                      className={`hover:text-primary hover:underline`}
                      onClick={() => {
                        toggleViewMode({
                          ...annonce.detailsVehicule,
                          regularisation: annonce.regularisation,
                        });
                      }}
                    >
                      Voir les fichiers uploadés
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {annonces.length <= 0 && (
        <div className="text-center w-full mt-2">
          Aucune annonce trouvée! Voulez-vous en poster?{" "}
          <span className="text-primary underline">
            <Link to={"/annonces/create"}>C'est par ici.</Link>
          </span>
        </div>
      )}
      {isViewMode && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-gray-800 bg-opacity-50 flex flex-col gap-2 justify-center items-center">
          <div>
            <div className="bg-white rounded-xl shadow-md min-w-[400px] relative">
              <h2 className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg justify-between">
                Photos et pièces soumises
                <button
                  type="button"
                  onClick={() => {
                    setIsViewMode(false);
                  }}
                  className="font-bold text-2xl p-1 border-2 hover:bg-background"
                >
                  <IoClose />
                </button>
              </h2>
              <p className="text-center text-font-bold font-bold">
                Photos du véhicule
              </p>
              {selectedVehicule.photos.map((photo, index) => (
                <Link
                  to={`${REACT_APP_BACKEND_URL}/photosVoitures/${photo}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p className="text-center hover:text-primary underline">
                    Photo n°{index + 1}
                  </p>
                </Link>
              ))}
              <p className="text-center text-font-bold font-bold">
                Véhicule
                {selectedVehicule.regularisation
                  ? " régularisé: pièces"
                  : " non régularisé (pas de pièces fournies)"}
              </p>
              {selectedVehicule.regularisation &&
                Object.keys(selectedVehicule.pieces).map((key) => (
                  <p
                    className="text-center hover:text-primary underline"
                    key={key}
                  >
                    <Link
                      to={`${REACT_APP_BACKEND_URL}/${key}/${selectedVehicule.pieces[key]}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {camelCaseToNormalText(key)}
                    </Link>
                  </p>
                ))}
            </div>
          </div>
          {/* <AssuranceOfferView assuranceOffer={selectedOffer} /> */}
        </div>
      )}
    </div>
  );
};

export default AnnonceManage;
