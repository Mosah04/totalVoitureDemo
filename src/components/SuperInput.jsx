import React from "react";

const SuperInput = ({
  htmlFor,
  name,
  type,
  placeholder,
  labelText,
  children,
  message,
  className,
  value,
  onChange,
  error,
  min,
  max,
  disabled,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-font-light"
      >
        {labelText}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {children}
        </div>
        <input
          type={type}
          name={name}
          id={htmlFor}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          className={`${
            disabled ? "bg-line" : "bg-transparent"
          } border border-line text-font-normal text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none block w-full p-2.5 ${
            children ? "ps-10" : ""
          }`}
          placeholder={placeholder}
          disabled={disabled || false}
        />
      </div>
      {message && (
        <p
          id="helper-text-explanation"
          className={
            !error
              ? "mt-2 text-xs text-font-normal"
              : "mt-2 text-xs text-secondary"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SuperInput;
