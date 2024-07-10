import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import TButton from "../../components/TButton";

import { IoCarSport } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { GiGearStick, GiMoneyStack } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { FaFileContract } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { BsBodyText } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { TbCertificate, TbCertificateOff } from "react-icons/tb";
import { MdOutlineVerified } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useAuth } from "../../contexts/authContext";

const AnnonceShow = () => {
  const { REACT_APP_BACKEND_URL } = process.env;
  const { annonce } = useLoaderData();
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Annonce ${annonce.detailsVehicule.marque} ${annonce.detailsVehicule.modele}`;
    return () => (document.title = previousTitle);
  }, [annonce]);

  const { currentUserDB } = useAuth();

  console.log(annonce);
  console.log(currentUserDB);

  return (
    <div>
      <div className="bg-white rounded-xl gap-8 justify-center p-3 flex">
        <div className="xl:w-[70%] w-auto rounded-xl bg-background p-3 space-y-3">
          <Carousel>
            {annonce.detailsVehicule.photos.map((photo, index) => (
              <div key={photo}>
                <img
                  src={`${REACT_APP_BACKEND_URL}/photosVoitures/${photo}`}
                  alt={`${annonce.modele} n°${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
          <div className="bg-white rounded-xl shadow-md">
            <p className="text-font-bold font-bold p-2 border-b border-font-bold flex items-center text-lg">
              <IoSettings className="mr-2" /> Caractéristiques techniques
            </p>
            <ul className="p-2 space-y-1">
              <li className="flex justify-between">
                <span className="flex items-center">
                  <IoCarSport className="mr-1" /> Marque
                </span>
                <span className="text-font-bold font-bold">
                  {annonce.detailsVehicule.marque}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">
                  <IoCarSport className="mr-1" />
                  Modèle
                </span>
                <span className="text-font-bold font-bold">
                  {annonce.detailsVehicule.modele}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">
                  <IoCalendarOutline className="mr-1" /> Année de sortie
                </span>
                <span className="text-font-bold font-bold">
                  {annonce.detailsVehicule.annee}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">
                  <GiGearStick className="mr-1" /> Boite de vitesse
                </span>
                <span className="text-font-bold font-bold">
                  {annonce.detailsVehicule.transmission[0].toUpperCase() +
                    annonce.detailsVehicule.transmission.slice(1)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">
                  <CiUser className="mr-1" /> Nombre de places
                </span>
                <span className="text-font-bold font-bold">
                  {annonce.detailsVehicule.places}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">
                  <FaFileContract className="mr-1" />
                  Etat de régularisation
                </span>
                <span className="text-font-bold font-bold">
                  {`${
                    annonce.regularisation
                      ? "Véhicule régularisé"
                      : "Véhicule non régularisé"
                  }`}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md">
            <p className="text-font-bold font-bold p-2 border-b border-font-bold text-justify flex items-center text-lg">
              <BsBodyText className="mr-2" /> Description de la voiture
            </p>
            <div className="p-2">
              <p>{annonce.description}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md">
            <p className="text-font-bold font-bold p-2 border-b border-font-bold text-justify flex items-center text-lg">
              <BsInfoCircle className="mr-2" /> Informations complémentaires
            </p>
            <div className="p-2">
              <ul className="p-2 space-y-1">
                <li className="flex justify-between">
                  <span className="flex items-center">
                    <MdOutlineVerified className="mr-1" /> Vérification
                  </span>
                  <span className="text-font-bold font-bold flex items-center">
                    Annonce{" "}
                    {annonce.validationAdmin ? (
                      <>
                        vérifiée
                        <TbCertificate className="ml-2 text-lg text-green-500" />
                      </>
                    ) : (
                      <>
                        non vérifiée
                        <TbCertificateOff className="ml-2 text-lg text-secondary" />
                      </>
                    )}
                  </span>
                </li>
                {annonce.validationAdmin && (
                  <li className="flex justify-between">
                    <span className="flex items-center">
                      <GiMoneyStack className="mr-1 rotate-45" />
                      Prix
                    </span>
                    <span className="text-font-bold font-bold">
                      {new Intl.NumberFormat("bj-BJ", {
                        style: "currency",
                        currency: "XOF",
                      }).format(annonce.prixVehicule)}
                    </span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="flex items-center">
                    <BsPersonBoundingBox className="mr-1" /> Auteur de l'annonce
                  </span>
                  <span className="text-font-bold font-bold">
                    {annonce.user.nom + " " + annonce.user.prenoms}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {(currentUserDB.isAdmin || annonce.validationAdmin) &&
            annonce.user.idFirebase !== currentUserDB.idFirebase && (
              <div className="py-2 flex justify-between gap-4 flex-wrap">
                <TButton className={`min-w-fit px-2 py-3`}>
                  Discuter de l'offre
                </TButton>
                {!currentUserDB.isAdmin && (
                  <TButton className={`min-w-fit px-2 py-3`}>
                    Acheter le véhicule
                  </TButton>
                )}
              </div>
            )}
        </div>
        {!currentUserDB.isAdmin &&
          annonce.validationAdmin &&
          annonce.user.idFirebase !== currentUserDB.idFirebase && (
            <div className="h-fit rounded-xl bg-background p-3 space-y-3 hidden xl:block xl:w-[30%]">
              <div className="bg-white rounded-xl shadow-md">
                <p className="text-font-bold font-bold p-2 border-b border-font-bold text-justify w-full truncate">
                  {annonce.detailsVehicule.marque +
                    " " +
                    annonce.detailsVehicule.modele}
                </p>
                <div className="p-2 flex flex-col items-center">
                  <p>
                    {new Intl.NumberFormat("bj-BJ", {
                      style: "currency",
                      currency: "XOF",
                    }).format(annonce.prixVehicule)}
                  </p>
                  <TButton className={`max-w-fit px-2 py-3`}>
                    Acheter le véhicule
                  </TButton>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AnnonceShow;
