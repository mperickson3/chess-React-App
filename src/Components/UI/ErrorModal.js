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
          {props.modalButtonsOk && (
            <button className="modalButtonPrimary" onClick={deleteDenied}>
              OK
            </button>
          )}
          {props.modalButtons && (
            <button className="modalButtonPrimary" onClick={deleteConfirmed}>
              YES
            </button>
          )}
          {props.modalButtons && (
            <button className="modalButtonSecondary" onClick={deleteDenied}>
              NO
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
