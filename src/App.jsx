import React, { useState, useEffect } from "react";
import { StatusDisplay } from "./components/Status/StatusDisplay";
import { MainView } from "./components/Main/MainView";
import { MotivationText } from "./components/MotivationText";
import { Scroll } from "./components/Scroll";
import { Buttons } from "./components/Buttons/Buttons";
import { Modal } from "./components/Modal/Modal";
import { StatusBlock } from "./components/Status/StatusBlock";
import { Body, Plus, Minus } from "./svg/";
import { Edit } from "./components/Main/Edit";

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
        console.info("[GET]", data);
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
      console.info("[UPDATE]", data.Attributes);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLERS

  // When clicked on the plus button, then deduct the bottle size from total & update db and state & don't go above the goal
  const handleAdd = () => {
    console.info("[INCREMENT]", bottleSize);
    if (total < goal) {
      const update = (value) => {
        return value + bottleSize < goal ? value + bottleSize : goal;
      };
      putUserData({ goal, total: update(total) });
      setTotal((prevTotal) => update(prevTotal));
    }
  };

  // When clicked on the minus button, then add the bottle size to total & update db and state & don't go below 0
  const handleDeduct = () => {
    console.info("[DECREMENT]", bottleSize);
    if (total > 0) {
      const update = (value) => {
        return value - bottleSize > 0 ? value - bottleSize : 0;
      };
      putUserData({ goal, total: update(total) });
      setTotal((prevTotal) => update(prevTotal));
    }
  };

  // When select bottle size, then convert it to liters & update state
  const handleSelect = (value) => {
    const selectedValue = parseInt(value);
    console.info("[SELECT]", selectedValue);
    // get the value of the scroll bar and parse it to an integer, then to liters
    setBottleSize(selectedValue);
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
    console.info("[CHANGE]", updatedGoal);
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

  // REUSABLE FUNCTIONS
  const onlyShowTwoDecimals = (value) => value.toString().slice(0, 4);

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
      <StatusDisplay>
        <StatusBlock
          position="left"
          title={`${onlyShowTwoDecimals(total / 1000)} L`}
          text="TOTAL WATER DRUNK"
        />
        <StatusBlock position="right" title={15} text="ACHIEVED GOAL DAYS" />
      </StatusDisplay>
      <MainView>
        <Body saturation={total / goal} />
        <Edit
          text={`${onlyShowTwoDecimals(goal / 1000)} L`}
          handleEdit={handleEdit}
        />
      </MainView>
      <MotivationText goal={goal} total={total} />
      <Scroll
        list={[100, 250, 350, 450, 550, 1000]}
        selected={bottleSize.toString()}
        handleSelect={handleSelect}
      />
      <Buttons>
        <button className="btn right" type="button" onClick={handleDeduct}>
          <Minus />
        </button>
        <button className="btn left" type="button" onClick={handleAdd}>
          <Plus />
        </button>
      </Buttons>
    </div>
  );
};
