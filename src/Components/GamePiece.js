import React from "react";
import "./GamePiece.css";

const GamePiece = (props) => {
  return <div className="pieceText">{props.piece.slice(0, -1)}</div>;
};

export default GamePiece;
