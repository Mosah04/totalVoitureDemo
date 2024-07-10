import { redirect } from "react-router-dom";

const { REACT_APP_BACKEND_URL } = process.env;

export const addUserInfos = async (token, data) => {
  try {
    const response = await fetch(
      `${REACT_APP_BACKEND_URL}/assurances/infos-client`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.message}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error in addUserInfos:", error.message);
    throw error;
  }
};

export const createAssuranceOffer = async (token, data) => {
  try {
    const response = await fetch(
      `${REACT_APP_BACKEND_URL}/assurances/create-offer`,
      {
        method: "POST",
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
    console.error("Error in createAssuranceOffer:", error.message);
    throw new Error(error);
  }
};

const getAssuranceOfferOrRequestWithUserId = async (idUser) => {
  const requestURL = `${REACT_APP_BACKEND_URL}/assurances/user/${idUser}`;
  try {
    const response = await fetch(requestURL, {
      method: "GET",
    });
    console.log("RESPONSE", response);
    if (!response.ok) {
      console.log("GGGGGGGGGGG");
      if (response.status === 428) {
        const data = await response.json();
        return data;
      }

      console.log(response.status);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${response.message}`
      );
    }
    const assurances = await response.json();
    return assurances;
  } catch (error) {
    console.error("Error in getAssuranceWithUserId:", error.message);
    throw error;
  }
};

export const assuranceORLoaderWithUserId = async ({ params: { idUser } }) => {
  const assurances = await getAssuranceOfferOrRequestWithUserId(idUser);
  if (assurances.needsVehicleInfos) {
    return redirect("/assurances/details-vehicule");
  }
  console.log("ASSU", assurances);
  return { assurances };
};
