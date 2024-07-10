const { REACT_APP_BACKEND_URL } = process.env;

export const createDevis = async (token, data) => {
  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/devis`, {
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
    console.error("Error in createDevis:", error.message);
    throw new Error(error);
  }
};

export const updateDevis = async (token, devisId, data) => {
  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/devis/${devisId}`, {
      method: "PATCH",
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
    console.error("Error in updateDevis:", error.message);
    throw new Error(error);
  }
};

const getDevis = async (id = undefined) => {
  const requestURL = !id
    ? `${REACT_APP_BACKEND_URL}/devis`
    : `${REACT_APP_BACKEND_URL}/devis/${id}`;
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
    const devis = await response.json();
    return devis;
  } catch (error) {
    console.error("Error in getDevis:", error.message);
    throw error;
  }
};

const getDevisWithUserId = async (idUser) => {
  const requestURL = `${REACT_APP_BACKEND_URL}/devis/user/${idUser}`;
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
    const devis = await response.json();
    return devis;
  } catch (error) {
    console.error("Error in getDevisWithUserId:", error.message);
    throw error;
  }
};

const getDevisByDemandeId = async (demandeId) => {
  const requestURL = `${REACT_APP_BACKEND_URL}/devis/demande/${demandeId}`;
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
    const devis = await response.json();
    return devis;
  } catch (error) {
    console.error("Error in getDevisWithUserId:", error.message);
    throw error;
  }
};

export const devisLoaderWithId = async ({ params: { devisId } }) => {
  const devis = await getDevis(devisId);
  return { devis };
};

export const devisLoaderWithUserId = async ({ params: { idUser } }) => {
  const devis = await getDevisWithUserId(idUser);
  return { devis };
};

export const devisLoaderByDemandeId = async ({ params: { demandeId } }) => {
  const devis = await getDevisByDemandeId(demandeId);
  return { devis };
};
