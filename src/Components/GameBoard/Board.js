import React, { useState } from "react";
import Boardspace from "./Boardspace";
import "./Board.css";
import Icons from "../Icons/Icons";

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

  //This may be used to change the color of the selected space for some more user feedback
  // const [currentSpaceSelected, setCurrentSpaceSelected] = useState("");

  const clickedPieceCheck = (space) => {
    //Check to see if a move is attempted
    //Click the piece you would like to move then click the space you would like to go to
    previousSpace = currentSpace;
    previousPiece = currentPiece;
    currentSpace = space;
    currentPiece = props.gameState[currentSpace];
    //Helps understand what pieces are selected
    console.log(
      "Curent piece: " + currentPiece + "Current space: " + currentSpace
    );
    console.log(
      "Previous piece: " + previousPiece + "Previous space: " + previousSpace
    );

    //Calls the parent Move Piece function if certain conditions are met
    if (currentPiece === "" && previousPiece !== "") {
      props.movePiece(
        previousSpace,
        currentSpace,
        previousPiece,
        props.username
      );
    } else if (currentPiece[0] !== previousPiece[0] && previousPiece !== "") {
      props.movePiece(
        previousSpace,
        currentSpace,
        previousPiece,
        props.username
      );
    }
  };

  const setCurrentSpaceCheck = (space) => {
    // setCurrentSpaceSelected(space);
  };

  return (
    <div className="board">
      <div className="rowC">
        {boardMapKeys.map((spaces) => {
          return (
            <Boardspace
              key={spaces}
              space={spaces}
              icons={Icons}
              piece={props.gameState[spaces]}
              gameStateTest={props.gameState}
              clickedPieceCheck={clickedPieceCheck}
              setCurrentSpaceCheck={setCurrentSpaceCheck}
              currentSpace={currentSpace}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
