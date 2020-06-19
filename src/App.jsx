import React, { useState, useEffect } from "react";
import { StatusDisplay } from "./components/Status/StatusDisplay";
import { MainView } from "./components/Main/MainView";
import { MotivationText } from "./components/MotivationText";
import { Scroll } from "./components/Scroll";
import { Buttons } from "./components/Buttons/Buttons";
import { Modal } from "./components/Modal/Modal";

export const App = () => {
  // User
  let userID = "0";

  // HOOKS
  const [goal, setGoal] = useState(0);
  const [total, setTotal] = useState(0);
  const [bottleSize, setBottleSize] = useState(250);
  const [showModal, setShowModal] = useState(false);

  // This gets user data upon first render
  useEffect(() => {
    getUserData(); // eslint-disable-next-line
  }, []);

  // API
  const API_ENDPOINT = `https://nnedhxridl.execute-api.eu-west-2.amazonaws.com/dev/v1/${userID}`;

  const getUserData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      if (data !== null || data !== undefined) {
        const { goal, total } = data;
        setGoal(goal);
        setTotal(total);
        return data;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const putUserData = async ({ goal, total }) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal, total }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLERS

  // When clicked on the plus button, then deduct the bottle size from total & update db and state & don't go above the goal
  const handleAdd = () => {
    if (total < goal) {
      // prevents the unnecessary API call after reaching the goal
      const update = total + bottleSize <= goal ? total + bottleSize : goal;
      putUserData({ goal, total: update });
    }

    setTotal((prevTotal) =>
      prevTotal + bottleSize <= goal ? prevTotal + bottleSize : goal
    );
  };

  // When clicked on the minus button, then add the bottle size to total & update db and state & don't go below 0
  const handleDeduct = () => {
    if (total > 0) {
      const update = total - bottleSize >= 0 ? total - bottleSize : 0;
      putUserData({ goal, total: update });
    }

    setTotal((prevTotal) =>
      prevTotal - bottleSize >= 0 ? prevTotal - bottleSize : 0
    );
  };

  // When select bottle size, then convert it to liters & update state
  const handleSelect = (selectedValue) => {
    // get the value of the scroll bar and parse it to an integer, then to liters
    setBottleSize(parseInt(selectedValue));
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
    const updatedGoal = parseInt(e.target.update.value);
    if (updatedGoal < total) {
      putUserData({ goal: updatedGoal, total: updatedGoal });
      setTotal(updatedGoal);
    } else {
      putUserData({ goal: updatedGoal, total });
    }
    setGoal(updatedGoal);
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
        selected={bottleSize.toString()}
        handleSelect={handleSelect}
      />
      <Buttons handleAdd={handleAdd} handleDeduct={handleDeduct} />
    </div>
  );
};
