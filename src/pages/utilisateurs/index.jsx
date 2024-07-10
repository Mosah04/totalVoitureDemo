import React, { useState } from "react";
import { FaRegEye, FaTrashAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi2";
import { Link } from "react-router-dom";

const UtilisateurIndex = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleEditMode = (user) => {
    setSelectedUser(user);
    setIsEditMode(!isEditMode);
  };

  return (
    <div>
      <div className="w-full p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left bg-gray-50 border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-primary text-white text-xs uppercase">
              <tr>
                <th scope="col" className="px-4 py-3">
                  N°
                </th>
                <th scope="col" className="px-4 py-3">
                  Id
                </th>
                <th scope="col" className="px-4 py-3">
                  Nom
                </th>
                <th scope="col" className="px-4 py-3">
                  Prenom
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Numeros
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">1871761</td>
                <td className="px-4 py-3">Dupont</td>
                <td className="px-4 py-3">Jean</td>
                <td className="px-4 py-3">jean.dupont@example.com</td>
                <td className="px-4 py-3">0123456789</td>
                <td>
                  <div className="flex justify-center gap-4 px-2">
                    <Link to={`show`}>
                      <FaRegEye
                        title="Voir"
                        className="transition-hover duration-300 hover:text-green-500"
                      />
                    </Link>
                    <button
                      onClick={() =>
                        toggleEditMode({
                          id: 1,
                          nom: "Dupont",
                          prenom: "Jean",
                          email: "jean.dupont@example.com",
                          numero: "0123456789",
                        })
                      }
                    >
                      <HiOutlinePencil
                        title="Modifier"
                        className="transition-hover duration-300 hover:text-yellow-500"
                      />
                    </button>
                    <FaTrashAlt
                      title="Supprimer"
                      className="transition-hover duration-300 hover:text-secondary"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isEditMode && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Modifier les informations de l'utilisateur
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="nom" className="block font-bold mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  defaultValue={selectedUser.nom}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="prenom" className="block font-bold mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  defaultValue={selectedUser.prenom}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  defaultValue={selectedUser.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="numero" className="block font-bold mb-2">
                  Numéro
                </label>
                <input
                  type="text"
                  id="numero"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  defaultValue={selectedUser.numero}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2"
                  onClick={toggleEditMode}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilisateurIndex;
