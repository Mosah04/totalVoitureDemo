import React from "react";
import SuperInput from "./SuperInput";

const ServiceInput = ({
  number,
  closeable,
  onClose,
  descriptionValue,
  onDescriptionChange,
  descriptionMessage,
  unitPriceValue,
  onUnitPriceChange,
  unitPriceMessage,
  quantityValue,
  onQuantityChange,
  quantityMessage,
  totalPriceValue,
}) => {
  return (
    <div className="border border-line py-3 mx-4 rounded-lg relative">
      <span className="inline-block absolute top-0 left-4 -translate-y-1/2  bg-white px-2">
        Service n°{number}
      </span>
      {closeable && (
        <span
          className="inline-block absolute top-0 right-4 -translate-y-1/2 bg-primary text-white px-2 shadow-sm shadow-primary rounded-sm cursor-pointer select-none"
          onClick={() => {
            onClose();
          }}
        >
          X
        </span>
      )}
      <div className="space-y-8">
        <SuperInput
          htmlFor={`description${number}Input`}
          labelText="Description du service"
          placeholder="Suivi de la régularisation"
          type="text"
          className="flex-1 flex-shrink-0 min-w-[300px] mx-2"
          value={descriptionValue}
          onChange={(e) => {
            onDescriptionChange(e);
          }}
          error={true}
          message={descriptionMessage}
        />
        <div className="flex flex-wrap justify-between gap-8 mx-2">
          <SuperInput
            htmlFor={`prix${number}Input`}
            labelText="Prix unitaire du service"
            placeholder="175"
            type="number"
            min={100}
            className="flex-1 flex-shrink-0 min-w-[300px]"
            value={unitPriceValue}
            onChange={(e) => {
              onUnitPriceChange(e);
            }}
            error={true}
            message={unitPriceMessage}
          />
          <SuperInput
            htmlFor={`quantite${number}Input`}
            labelText="Quantité"
            placeholder="1"
            type="number"
            min={1}
            className="flex-1 flex-shrink-0 min-w-[300px]"
            value={quantityValue}
            onChange={(e) => {
              onQuantityChange(e);
            }}
            error={true}
            message={quantityMessage}
          />
        </div>
        <SuperInput
          htmlFor={`prix${number}Total`}
          labelText="Prix total du service"
          placeholder="0FCFA"
          type="text"
          className="flex-1 flex-shrink-0 min-w-[300px] mx-2"
          disabled={true}
          value={totalPriceValue}
        />
      </div>
    </div>
  );
};

export default ServiceInput;
