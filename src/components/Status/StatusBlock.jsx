import React from "react";

export const StatusBlock = (props) => {
  return (
    <div className={props.position}>
      <p className="status-title">{props.title}</p>
      <p className="status-text">{props.text}</p>
    </div>
  );
};
