import React from "react";
import { StatusBlock } from "./StatusBlock";

export const StatusDisplay = ({ total, days }) => {
  return (
    <div className="grid-wrapper">
      <StatusBlock
        position="left"
        title={!isNaN(total) ? `${total / 1000} L` : ""}
        text="TOTAL WATER DRUNK"
      />
      <StatusBlock position="right" title={days} text="ACHIEVED GOAL DAYS" />
    </div>
  );
};
