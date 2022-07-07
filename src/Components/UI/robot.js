import React from "react";
import "./gameType.css";
import Multi from "../Icons/Multi.png";

const MultiPlayer = (props) => {
  return (
    <div>
      <div className="gameType">
        <img src={Multi} className="gameImage" width={48} height={52}></img>
        <div className="gameMessage">
          <div className="gameTitle">Multiplayer</div>
          <div className="gameDesc">Where friends become enemies</div>
        </div>
      </div>
    </div>
  );
};

export default MultiPlayer;
