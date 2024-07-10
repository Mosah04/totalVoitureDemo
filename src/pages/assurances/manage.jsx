import React from "react";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import ShowAssuranceOffers from "./manageClient";
import ShowAssuranceRequests from "./manageAdmin";

const AssuranceManage = () => {
  const { assurances } = useLoaderData();
  const { currentUserDB } = useAuth();

  return currentUserDB.isAdmin ? (
    <ShowAssuranceRequests requests={assurances} />
  ) : (
    <ShowAssuranceOffers offers={assurances} />
  );
};

export default AssuranceManage;
