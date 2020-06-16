import React from "react";

const getMessage = (saturation) => {
  switch (true) {
    case 0 <= saturation && saturation < 20:
      return "Go get your bottle now!";
    case 20 <= saturation && saturation < 50:
      return "Could use some more today";
    case 50 <= saturation && saturation < 80:
      return "Great effort! Almost there";
    case 80 <= saturation && saturation <= 100:
      return "Congratulations! You're an ocean now";
    default:
      return "Oops!";
  }
};
export const MotivationText = ({ total, goal }) => {
  const saturation = (total / goal) * 100;
  return (
    <div className="motivation-text">
      <span>{getMessage(saturation)}</span>
    </div>
  );
};
