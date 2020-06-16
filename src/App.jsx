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

  // This gets user data upon first render
  useEffect(() => {
    getUserData();
  }, []);

  // API
  const API_GATEWAY =
    "https://rrtjquqtyc.execute-api.eu-west-2.amazonaws.com/dev/";

  const getUserData = async () => {
    const response = await fetch(API_GATEWAY);
    const data = await response.json();
    const { goal, total } = data.body;
    setGoal(goal);
    setTotal(total);
    return data;
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
    return data;
  };

  // HANDLERS

  // When clicked on the plus button, then deduct the bottle size from total & update db and state & don't go above the goal
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

  // When clicked on the minus button, then add the bottle size to total & update db and state & don't go below 0
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

  // When select bottle size, then convert it to liters & update state
  const handleSelect = (selectedValue) => {
    // get the value of the scroll bar and parse it to an integer, then to liters
    setBottleSize(parseInt(selectedValue) / 1000);
  };

  // When clicked on x or the button, then close the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // When clicked outside, then close the modal
  const closeModal = (e) => {
    if (e.target.id === "outside") {
      toggleModal();
    }
  };

  // When goal updated in modal, then update db & state, then reset total to 0
  const handleUpdate = (e) => {
    e.preventDefault();
    const value = +parseFloat(e.target.update.value).toFixed(2);
    putUserData({ goal: value, total: 0 });
    setGoal(value);
    setTotal(0);
    toggleModal();
  };

  // When clicked on edit button, then open modal
  const handleEdit = () => {
    setShowModal(true);
  };

  return (
    <div className="container">
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
    </div>
  );
};
