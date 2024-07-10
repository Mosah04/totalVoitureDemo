import React from "react";

const AssuranceSubscriptions = () => {
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
              Type de couverture
            </th>
            <th scope="col" className="px-4 py-3">
              Date de souscription
            </th>
            <th scope="col" className="px-4 py-3">
              Date d'expiration
            </th>
            <th scope="col" className="px-4 py-3">
              Statut
            </th>
            <th scope="col" className=""></th>
          </tr>
        </thead>
      </table>
      <div className="py-2 text-center">
        {" "}
        Vous n'avez encore souscrit à aucune assurance!
      </div>
    </div>
  );
};

export default AssuranceSubscriptions;
