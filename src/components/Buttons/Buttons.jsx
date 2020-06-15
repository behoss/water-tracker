import React from "react";
import { Plus, Minus } from "../../svg";

export const Buttons = (props) => {
  return (
    <div className="grid-wrapper">
      <button className="btn right" type="button" onClick={props.handleDeduct}>
        <Minus />
      </button>
      <button className="btn left" type="button" onClick={props.handleAdd}>
        <Plus />
      </button>
    </div>
  );
};
