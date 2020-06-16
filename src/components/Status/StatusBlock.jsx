import React from "react";

export const StatusBlock = ({ position, title, text }) => {
  return (
    <div className={position}>
      <span className="status-title">{title}</span>
      <p className="status-text">{text}</p>
    </div>
  );
};
