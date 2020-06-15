import React from "react";

import { Edit } from "./Edit";
import { Body } from "../../svg";

export const MainFigure = ({ total, goal }) => {
  return (
    <div className="main">
      <Body saturation={total / goal} />
      <Edit text={!isNaN(goal) ? goal : ""} />
    </div>
  );
};
