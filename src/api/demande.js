import { redirect } from "react-router-dom";

const { REACT_APP_BACKEND_URL } = process.env;

export const createDemande = async (token, data) => {
  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/demandes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response.status);
      throw new Error(response);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createDemande:", error.message);
    throw new Error(error);
  }
};

export const updateDemande = async (token, demandeId, data) => {
  try {
    const response = await fetch(
      `${REACT_APP_BACKEND_URL}/demandes/${demandeId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      throw new Error(response);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in updateDemande:", error.message);
    throw new Error(error);
  }
};

const getDemandes = async (id = undefined) => {
  const requestURL = !id
    ? `${REACT_APP_BACKEND_URL}/demandes`
    : `${REACT_APP_BACKEND_URL}/demandes/${id}`;
  try {
    const response = await fetch(requestURL, {
      method: "GET",
    });
    if (!response.ok) {
      console.log(response.status);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.message}`
      );
    }
    const demandes = await response.json();
    return demandes;
  } catch (error) {
    console.error("Error in getDemande:", error.message);
    throw error;
  }
};
const getDemandesWithUserId = async (idUser) => {
  const requestURL = `${REACT_APP_BACKEND_URL}/demandes/user/${idUser}`;
  try {
    const response = await fetch(requestURL, {
      method: "GET",
    });
    if (!response.ok) {
      console.log(response.status);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.message}`
      );
    }
    const demandes = await response.json();
    return demandes;
  } catch (error) {
    console.error("Error in getDemandeWithUserId:", error.message);
    throw error;
  }
};
export const demandesLoader = async () => {
  const demandes = await getDemandes();
  console.log("DEMANDES", demandes);
  return { demandes };
};
export const demandesLoaderWithId = async ({ params: { demandeId } }) => {
  const demande = await getDemandes(demandeId);
  console.log("DEMANDESID", demande);
  return { demande };
};

export const demandesLoaderWithUserId = async ({ params: { idUser } }) => {
  const demandes = await getDemandesWithUserId(idUser);
  console.log("DEMANDESID1", demandes);
  return { demandes };
};
