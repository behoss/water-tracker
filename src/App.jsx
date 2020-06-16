import React, { useState, useEffect } from "react";
import { StatusDisplay } from "./components/Status/StatusDisplay";
import { MainView } from "./components/Main/MainView";
import { MotivationText } from "./components/MotivationText";
import { Scroll } from "./components/Scroll";
import { Buttons } from "./components/Buttons/Buttons";
import { Modal } from "./components/Modal/Modal";

export const App = () => {
  // HOOKS
  const [goal, setGoal] = useState([]);
  const [total, setTotal] = useState([]);
  const [bottleSize, setBottleSize] = useState(0.25);
  const [showModal, setShowModal] = useState(false);

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

  const putUserData = async ({ goal, total }) => {
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
      putUserData({ goal, total: update });
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
      putUserData({ goal, total: update });
    }

    setTotal((prevTotal) =>
      prevTotal - bottleSize >= 0 ? +(prevTotal - bottleSize).toFixed(2) : 0
    );
  };

  const handleSelect = (selectedValue) => {
    // get the value of the scroll bar and parse it to an integer, then to liters
    setBottleSize(parseInt(selectedValue) / 1000);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = (e) => {
    if (e.target.id === "outside") {
      toggleModal();
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const value = +parseFloat(e.target.update.value).toFixed(2);
    putUserData({ goal: value, total: 0 });
    setGoal(value);
    setTotal(0);
    toggleModal();
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
      {showModal && (
        <Modal
          toggleModal={toggleModal}
          closeModal={closeModal}
          goal={goal}
          handleUpdate={handleUpdate}
        />
      )}
      <StatusDisplay total={total} days={15} />
      <MainView goal={goal} total={total} handleEdit={handleEdit} />
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
