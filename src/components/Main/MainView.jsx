import React from "react";

import { Edit } from "./Edit";
import { Body } from "../../svg";

export const MainView = ({ total, goal, handleEdit }) => {
  return (
    <div className="main">
      <Body saturation={total / goal} />
      <Edit text={!isNaN(goal) ? goal : ""} handleEdit={handleEdit} />
    </div>
  );
};
