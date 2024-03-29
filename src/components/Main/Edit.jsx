import React from "react";

export const Edit = ({ text, handleEdit }) => {
  return (
    <div className="edit" onClick={handleEdit}>
      <span>
        {text} <span className="flip-horizontally"> ✎</span>
      </span>
    </div>
  );
};
