import React from "react";
import { Plus, Minus } from "../../svg";

export const Buttons = ({ handleDeduct, handleAdd }) => {
  return (
    <div className="grid-wrapper">
      <button className="btn right" type="button" onClick={handleDeduct}>
        <Minus />
      </button>
      <button className="btn left" type="button" onClick={handleAdd}>
        <Plus />
      </button>
    </div>
  );
};
