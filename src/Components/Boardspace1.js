import React, { useState } from "react";
import { Component } from "react/cjs/react.production.min";
import "./Boardspace.css";
import GamePiece from "./GamePiece";

const Boardspace1 = (props) => {
  const [pieceName, setPieceName] = useState(props.piece);
  let color = "";
  const num = parseInt(props.space.charCodeAt(0)) + parseInt(props.space[1]);
  if (num % 2 === 0) {
    color = "spaceBlack";
  } else {
    color = "spaceWhite";
  }

  const clickSpace = () => {
    //console.log(props.space);
    props.clickedPieceCheck(props.space);
  };

  return (
    <div className={color} onClick={clickSpace}>
      <GamePiece piece={props.gameStateTest[props.space]} key={pieceName} />
    </div>
  );
};

export default Boardspace1;
