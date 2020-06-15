import React, { useState, useEffect } from "react";
import { StatusDisplay } from "./components/Status/StatusDisplay";
import { MainFigure } from "./components/Main/MainView";
import { MotivationText } from "./components/MotivationText";
import { Scroll } from "./components/Scroll";
import { Buttons } from "./components/Buttons/Buttons";

export const App = () => {
  // HOOKS
  const [goal, setGoal] = useState([]);
  const [total, setTotal] = useState([]);
  const [bottleSize, setBottleSize] = useState(0.25);

  useEffect(() => {
    console.log("Getting data");
    getUserData();
  }, []);

  // API
  const API_GATEWAY =
    "https://rrtjquqtyc.execute-api.eu-west-2.amazonaws.com/dev/";

  const getUserData = async () => {
    const response = await fetch(API_GATEWAY);
    const data = await response.json();
    console.log(data.body);
    const { goal, total } = data.body;
    setGoal(goal);
    setTotal(total);
  };

  const putUserData = async (total) => {
    const response = await fetch(API_GATEWAY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal, total }),
    });
    const data = await response.json();
    console.log(data);
  };

  // HANDLERS
  const handleAdd = () => {
    if (total < goal) {
      // prevents the unnecessary API call after reaching the goal
      const update =
        total + bottleSize <= goal ? +(total + bottleSize).toFixed(2) : goal;
      putUserData(update);
    }

    setTotal((prevTotal) =>
      prevTotal + bottleSize <= goal
        ? +(prevTotal + bottleSize).toFixed(2)
        : goal
    );
  };

  const handleDeduct = () => {
    if (total > 0) {
      const update =
        total - bottleSize >= 0 ? +(total - bottleSize).toFixed(2) : 0;
      putUserData(update);
    }

    setTotal((prevTotal) =>
      prevTotal - bottleSize >= 0 ? +(prevTotal - bottleSize).toFixed(2) : 0
    );
  };

  const handleSelect = (selectedValue) => {
    // get the value of the scroll bar and parse it to an integer, then to liters
    setBottleSize(parseInt(selectedValue) / 1000);
  };

  return (
    <>
      <StatusDisplay total={total} days={15} />
      <MainFigure goal={goal} total={total} />
      <MotivationText goal={goal} total={total} />
      <Scroll
        list={[100, 250, 350, 450, 550, 1000]}
        selected={(bottleSize * 1000).toString()}
        handleSelect={handleSelect}
      />
      <Buttons handleAdd={handleAdd} handleDeduct={handleDeduct} />
    </>
  );
};

// SVGR https://www.robinwieruch.de/react-svg-icon-components
