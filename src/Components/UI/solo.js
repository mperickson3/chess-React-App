import React from "react";
import "./gameType.css";
import Single from "../Icons/Single.png";

const Solo = (props) => {
  const clickHandler = () => [props.newGameLocal()];

  return (
    <div>
      <div className="gameType" onClick={clickHandler}>
        <img src={Single} className="gameImage" width={48} height={52}></img>
        <div className="gameMessage">
          <div className="gameTitle">Solo</div>
          <div className="gameDesc">Either way you win...and lose</div>
        </div>
      </div>
    </div>
  );
};

export default Solo;
