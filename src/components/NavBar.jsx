import React from "react";

import { IoIosSearch } from "react-icons/io";
import { TbBellFilled } from "react-icons/tb";
import avatar from "../assets/images/avatar3.png";

const NavBar = ({ userAvatar }) => {
  return (
    <div className="sticky top-0 py-4 flex justify-between items-center w-full bg-background z-10">
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <IoIosSearch />
          </div>
          <input
            type="text"
            //   value={value}
            //   onChange={onChange}
            className={
              "bg-transparent border border-line text-font-normal text-sm rounded-full focus:ring-1 focus:ring-primary focus:border-primary outline-none block w-full ps-10 p-2.5 shadow-xl drop-shadow-xl"
            }
            placeholder="Tapez quelque chose..."
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          type="button"
          className="bg-font-bold inline-flex p-3 justify-center items-center text-white rounded-full text-xl"
        >
          <TbBellFilled />
        </button>
        <img
          className="rounded-full h-11 w-11"
          src={userAvatar || avatar}
          alt="User"
        />
      </div>
    </div>
  );
};

export default NavBar;
