import React from "react";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  return (
    <div className="backdrop">
      <div className="modalBox">
        <div className="modal">{props.title}</div>
        <div className="modal">{props.body}</div>
      </div>
    </div>
  );
};

export default ErrorModal;
