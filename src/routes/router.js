import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Auth from "../components/auth";
import VerifyOtp from "../pages/VerifyOtp";
import TellUsMore from "../pages/TellUsMore";
import Main from "../Main.js";
import Messages from "../pages/Messages.jsx";
import {
  annoncesLoader,
  annoncesLoaderWithId,
  annoncesLoaderWithUserId,
} from "../api/annonce.js";
import Annonces from "../pages/Annonces.jsx";
import AnnonceCreate from "../pages/annonces/create.jsx";
import AnnonceShow from "../pages/annonces/show";
import AnnonceManage from "../pages/annonces/manage.jsx";
import AnnonceEdit from "../pages/annonces/edit.jsx";
import AnnonceError from "../pages/annonces/error.jsx";
import AnnonceIndex from "../pages/annonces/indexPage.jsx";
import Assurance from "../pages/Assurance.jsx";
import Demande from "../pages/Demande.jsx";
import Settings from "../pages/Settings.jsx";
import DemandeIndex from "../pages/demandes/index.jsx";
import {
  demandesLoader,
  demandesLoaderWithId,
  demandesLoaderWithUserId,
} from "../api/demande.js";
import DemandeCreate from "../pages/demandes/create.jsx";
import DemandeShow from "../pages/demandes/show.jsx";
import DemandeManage from "../pages/demandes/manage.jsx";
import DemandeEdit from "../pages/demandes/edit.jsx";
import Utilisateur from "../pages/Utilisateur.jsx";
import Devis from "../pages/Devis.jsx";
import DevisCreate from "../pages/devis/create.jsx";
import DevisIndex from "../pages/devis/index.jsx";
import DevisManage from "../pages/devis/manage.jsx";
import {
  devisLoaderByDemandeId,
  devisLoaderWithId,
  devisLoaderWithUserId,
} from "../api/devis.js";
import DevisEdit from "../pages/devis/edit.jsx";
import DevisShow from "../pages/devis/show.jsx";
import DemandeDevis from "../pages/demandes/devis.jsx";

import AssuranceIndex from "../pages/assurances/index.jsx";
import { assuranceORLoaderWithUserId } from "../api/assurance.js";
import AssuranceDetVehicule from "../pages/assurances/detailsVehicule.jsx";
import AssuranceManage from "../pages/assurances/manage.jsx";
import AssuranceOfferCreate from "../pages/assurances/createOffer.jsx";
import AssuranceSubscriptions from "../pages/assurances/subscriptions.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Main />,
    children: [
      {
        path: "annonces/",
        element: <Annonces />,
        errorElement: <AnnonceError />,
        children: [
          {
            path: "",
            element: <AnnonceIndex />,
            loader: annoncesLoader,
            index: true,
          },
          {
            path: "create",
            element: <AnnonceCreate />,
          },
          {
            path: ":annonceId",
            loader: annoncesLoaderWithId,
            element: <AnnonceShow />,
          },
          {
            path: "user/:idUser",
            loader: annoncesLoaderWithUserId,
            element: <AnnonceManage />,
          },
          {
            path: ":annonceId/edit",
            loader: annoncesLoaderWithId,
            element: <AnnonceEdit />,
          },
          {
            path: "*",
            element: <div>Error 404, not found</div>,
          },
        ],
      },
      {
        path: "assurances/",
        element: <Assurance />,
        errorElement: <AnnonceError />,
        children: [
          {
            path: "",
            element: <AssuranceIndex />,
          },
          {
            path: "offres/create",
            element: <AssuranceOfferCreate />,
          },
          {
            path: "user/:idUser",
            loader: assuranceORLoaderWithUserId,
            element: <AssuranceManage />,
          },
          {
            path: "user/:idUser/subscriptions",
            element: <AssuranceSubscriptions />,
          },
          {
            path: "details-vehicule",
            element: <AssuranceDetVehicule />,
          },
        ],
      },
      {
        path: "importations/",
        element: <Demande />,
        children: [
          {
            path: "",
            element: <DemandeIndex />,
            loader: demandesLoader,
            index: true,
          },
          {
            path: "create",
            element: <DemandeCreate />,
          },
          {
            path: "show/:demandeId",
            loader: demandesLoaderWithId,
            element: <DemandeShow />,
          },
          {
            path: "user/:idUser",
            loader: demandesLoaderWithUserId,
            element: <DemandeManage />,
          },
          {
            path: ":demandeId/edit",
            loader: demandesLoaderWithId,
            element: <DemandeEdit />,
          },
          {
            path: ":demandeId/devis",
            loader: devisLoaderByDemandeId,
            element: <DemandeDevis />,
          },
          {
            path: "*",
            element: <div>Error 404, not found</div>,
          },
        ],
      },
      {
        path: "devis",
        element: <Devis />,
        children: [
          {
            path: "",
            element: <DevisIndex />,
            index: true,
          },
          {
            path: "create",
            element: <DevisCreate />,
          },
          {
            path: "user/:idUser",
            loader: devisLoaderWithUserId,
            element: <DevisManage />,
          },
          {
            path: ":devisId/edit",
            loader: devisLoaderWithId,
            element: <DevisEdit />,
          },
          {
            path: "show/:devisId",
            loader: devisLoaderWithId,
            element: <DevisShow />,
          },
          {
            path: "*",
            element: <div>Error 404, not found</div>,
          },
        ],
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "users/*",
        element: <Utilisateur />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/signup",
    element: <Auth />,
  },
  {
    path: "/tellUsMore",
    element: <TellUsMore />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
]);

export default router;
