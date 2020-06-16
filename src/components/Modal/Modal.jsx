import React from "react";
import "./Modal.css";

export const Modal = ({ toggleModal, closeModal, goal, handleUpdate }) => {
  return (
    <aside id="outside" className="modalWrapper" onClick={closeModal}>
      <div className="modalInner">
        <span className="close" onClick={toggleModal}>
          ×
        </span>
        <h1 className="modal-title">Update Target Water</h1>
        <p className="modal-text">Please enter your new water target below:</p>
        <form onSubmit={handleUpdate}>
          <input
            type="number"
            name="update"
            id="update"
            className="modal-input"
            defaultValue={goal}
            min="0"
            max="10"
            step="0.01"
            required
          />
          <button type="submit" className="modal-button">
            update
          </button>
        </form>
      </div>
    </aside>
  );
};
