import React from "react";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  const deleteDenied = () => {
    props.deleteResult(false);
  };

  const deleteConfirmed = () => {
    props.deleteResult(true);
  };

  return (
    <div className="backdrop">
      <div className="modalBox">
        <div className="modal">{props.title}</div>
        <div className="modal">{props.body}</div>
        <div className="row">
          {props.modalButtons && (
            <button className="modalButton" onClick={deleteConfirmed}>
              YES
            </button>
          )}
          {props.modalButtons && (
            <button className="modalButton" onClick={deleteDenied}>
              NO
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
