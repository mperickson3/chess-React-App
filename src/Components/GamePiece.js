import React, { useState } from "react";
import "./GamePiece.css";

const GamePiece = (props) => {
  // const gamePieceProps = {
  //   Name: props.name,
  //   Location: props.Location,
  // }

  return <div className="pieceText">{props.piece.slice(0, -1)}</div>;
};

export default GamePiece;
