import React from "react";
import "./TurnIndicator.css";
const TurnIcon = (props) => {
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
    <div className="turnIconCont">
      {props.turn === "w" && <div className="turnWhiteIcon"></div>}
      {props.turn === "b" && <div className="turnBlackIcon"></div>}
      {props.turn === "" && <div className="turnHiddenIcon"></div>}
    </div>
  );
};

export default TurnIcon;
