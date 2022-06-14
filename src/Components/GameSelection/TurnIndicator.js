import React from "react";
import "./TurnIndicator.css";
const TurnIndicator = (props) => {
  let turnHighlight = "";
  let blackBorder = "";
  let whiteBorder = "";
  if (props.turn === "w") {
    turnHighlight = "turnWhite";
    whiteBorder = "#d1ad6b";
  } else {
    turnHighlight = "turnBlack";
    blackBorder = "#d1ad6b";
  }
  return (
    <div className="row">
      <div className="turnWhite" style={{ borderColor: whiteBorder }}></div>
      <div className="turnBlack" style={{ borderColor: blackBorder }}></div>
    </div>
  );
};

export default TurnIndicator;
