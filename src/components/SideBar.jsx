import React, { useRef, useState, useEffect } from "react";
import { FaFire, FaUsers } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import PowerButton from "../assets/PowerButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useLayoutContext } from "../contexts/layoutContext";
import avatar from "../assets/images/avatar3.png";
import { GoHomeFill } from "react-icons/go";
import { HiSpeakerphone } from "react-icons/hi";
import { FaShieldAlt } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { MdImportExport } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import io from "socket.io-client";

const SideBar = ({ signOutFunc, uid, userName, userAvatarURL }) => {
  const { sideVisible, setSideVisible } = useLayoutContext();
  const [screenSize, setScreenSize] = useState(null);
  const side = useRef();
  const toggleSide = () => {
    setSideVisible((sideVisible) => !sideVisible);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 770) {
      setSideVisible(false);
    } else {
      setSideVisible(true);
    }
  }, [screenSize]);

  return (
    <aside
      ref={side}
      className={`fixed z-20 flex-shrink-0 bg-white w-72 h-full text-font-light transition-transform duration-500 ${
        sideVisible ? "" : "translate-x-[-100%]"
      }`}
    >
      <div className="relative h-full w-full p-6">
        <div
          onClick={toggleSide}
          className="inline-flex absolute bg-white top-1/2 right-0 translate-x-[100%] text-font-bold font-bold h-9 items-center rounded-r-lg cursor-pointer drop-shadow-lg"
        >
          <IoIosArrowBack
            className={`transition-transform duration-300 text-xl  ${
              sideVisible ? "" : "rotate-180"
            }`}
          />
        </div>
        <div className="relative h-full rounded-3xl flex flex-col gap-3">
          <FaFire className="h-12 w-12 mb-3 text-orange-500" />
          <div>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <GoHomeFill className="h-6 w-6" />
                <span>Accueil</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>

            <NavLink
              to={"/annonces"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <HiSpeakerphone className="h-6 w-6" />
                <span>Annonces</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>
            <NavLink
              to={"/assurances"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <FaShieldAlt className="h-6 w-6" />
                <span>Assurances</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>
            <NavLink
              to={"/importations"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <MdImportExport className="h-6 w-6" />
                <span>Importations</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>
            <NavLink
              to={"/devis"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <FaFileInvoiceDollar className="h-6 w-6" />
                <span>Devis</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>
            <NavLink
              to={"/messages"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <AiFillMessage className="h-6 w-6" />
                <span>Messages</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>
            <NavLink
              to={"/users"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <FaUsers className="h-6 w-6" />
                <span>Utilisateurs</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                `relative flex justify-between items-center rounded-r-2xl transition-hover duration-300 hover:bg-background hover:text-font-bold  ${
                  isActive ? "active font-bold text-font-bold" : ""
                }`
              }
            >
              <div className="flex gap-2 items-center pl-4 py-3 ">
                <IoSettings className="h-6 w-6" />
                <span>Paramètres</span>
              </div>
              <div className="flex h-6 w-6 text-white font-normal text-sm bg-secondary rounded-full justify-center items-center">
                2
              </div>
            </NavLink>
          </div>

          <div className="absolute bottom-0 w-full h-[25%] rounded-b-3xl">
            <div className="relative h-full w-full">
              <div className="absolute left-0 h-full w-[2.5rem] rounded-b-3xl bg-font-bold rounded-tr-3xl"></div>
              <div className="absolute right-0 h-full w-[2.5rem] rounded-b-3xl bg-font-bold rounded-tl-3xl"></div>
              <div className="absolute bottom-0 pb-3 rounded-b-3xl bg-font-bold h-[71%] w-full flex flex-col justify-end items-center">
                <div className="absolute bottom-0 flex flex-col items-center  -translate-y-1/2 bg-white  rounded-b-3xl w-[calc(100%-5rem)]">
                  <div className="inline-block h-20 w-20 rounded-full border border-orange-400">
                    <img
                      className="w-full h-full rounded-full"
                      src={userAvatarURL || avatar}
                      alt={userName || "utilisateur"}
                    />
                  </div>
                  <span className="text-font-bold mb-1">
                    {userName || "Votre nom"}
                  </span>
                  {/* <span>Role</span> */}
                </div>
                <button
                  onClick={() => signOutFunc()}
                  className="text-white flex mb-[1%]"
                  type="button"
                >
                  Déconnexion
                  <PowerButton className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
