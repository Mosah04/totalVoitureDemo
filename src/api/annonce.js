const { REACT_APP_BACKEND_URL } = process.env;

export const createAnnonce = async (token, data) => {
  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/annonces`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.message}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createAnnonce:", error.message);
    throw error;
  }
};

export const updateAnnonce = async (token, annonceId, data) => {
  try {
    const response = await fetch(
      `${REACT_APP_BACKEND_URL}/annonces/${annonceId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
    if (!response.ok) {
      console.log(response.status);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.message}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createAnnonce:", error.message);
    throw error;
  }
};

const getAnnonces = async (id = undefined) => {
  const requestURL = !id
    ? `${REACT_APP_BACKEND_URL}/annonces`
    : `${REACT_APP_BACKEND_URL}/annonces/${id}`;
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
    const annonces = await response.json();
    return annonces;
  } catch (error) {
    console.error("Error in createAnnonce:", error.message);
    throw error;
  }
};
const getAnnoncesWithUserId = async (idUser) => {
  const requestURL = `${REACT_APP_BACKEND_URL}/annonces/user/${idUser}`;
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
    const annonces = await response.json();
    return annonces;
  } catch (error) {
    console.error("Error in manageAnnonce:", error.message);
    throw error;
  }
};
export const annoncesLoader = async () => {
  const annonces = await getAnnonces();
  console.log("ANNONCES", annonces);
  return { annonces };
};
export const annoncesLoaderWithId = async ({ params: { annonceId } }) => {
  const annonce = await getAnnonces(annonceId);
  console.log("ANNONCESID", annonce);
  return { annonce };
};

export const annoncesLoaderWithUserId = async ({ params: { idUser } }) => {
  const annonces = await getAnnoncesWithUserId(idUser);
  console.log("ANNONCESID1", annonces);
  return { annonces };
};
