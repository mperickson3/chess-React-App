import React, { useState } from "react";
import Boardspace1 from "./Boardspace1";
import "./Board.css";
//Matthew
let currentSpace = "";

const Board = (props) => {
  const boardMapKeys = [
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
    "a2",
    "b2",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "h2",
    "a3",
    "b3",
    "c3",
    "d3",
    "e3",
    "f3",
    "g3",
    "h3",
    "a4",
    "b4",
    "c4",
    "d4",
    "e4",
    "f4",
    "g4",
    "h4",
    "a5",
    "b5",
    "c5",
    "d5",
    "e5",
    "f5",
    "g5",
    "h5",
    "a6",
    "b6",
    "c6",
    "d6",
    "e6",
    "f6",
    "g6",
    "h6",
    "a7",
    "b7",
    "c7",
    "d7",
    "e7",
    "f7",
    "g7",
    "h7",
    "a8",
    "b8",
    "c8",
    "d8",
    "e8",
    "f8",
    "g8",
    "h8",
  ];
  let previousPiece = "";
  let currentPiece = "";
  let previousSpace = "";

  const [currentSpaceSelected, setCurrentSpaceSelected] = useState("");
  // const [currentSpace, setCurrentSpace] = useState("");
  const clickedPieceCheck = (space) => {
    previousSpace = currentSpace;
    currentSpace = space;
    previousPiece = currentPiece;
    currentPiece = props.gameState[space];
    console.log(
      "Curent piece: " + currentPiece + "Current space: " + currentSpace
    );
    console.log(
      "Previous piece: " + previousPiece + "Previous space: " + previousSpace
    );

    if (currentPiece === "" && previousPiece !== "") {
      props.movePiece(previousSpace, currentSpace, previousPiece);
    } else if (currentPiece[0] !== previousPiece[0] && previousPiece !== "") {
      props.movePiece(previousSpace, currentSpace, previousPiece);
    }
  };

  const setCurrentSpaceCheck = (space) => {
    // setCurrentSpaceSelected(space);
  };

  return (
    <div className="board">
      <div className="rowC">
        {/*map all the pieces onto the board with necesary props*/}
        {boardMapKeys.map((spaces) => {
          return (
            <Boardspace1
              key={spaces}
              space={spaces}
              piece={props.gameState[spaces]}
              gameStateTest={props.gameState}
              clickedPieceCheck={clickedPieceCheck}
              setCurrentSpaceCheck={setCurrentSpaceCheck}
              currentSpace={currentSpace}
              // currentSpaceColor={currentSpaceSelected}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
