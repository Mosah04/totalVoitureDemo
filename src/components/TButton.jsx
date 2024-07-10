import React from "react";

const TButton = ({ type, disabled, children, className, onClick }) => {
  return (
    <button
      className={`text-white ${className} rounded-xl shadow-sm shadow-slate-500 active:shadow-sm flex items-center justify-center ${
        disabled ? "bg-primary/35 cursor-not-allowed" : "bg-primary"
      }`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TButton;
