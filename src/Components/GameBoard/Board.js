import React, { useState } from "react";
import Boardspace from "./Boardspace";
import "./Board.css";
import Icons from "../Icons/Icons";

//Matthew

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
  const [availableMoves, setAvailableMoves] = useState([]);
  const [kingCheckSpaces, setKingCheckSpaces] = useState([]);
  const [lastSelectedSpace, setLastSelectedSpace] = useState("");
  const [lastSelectedPiece, setLastSelectedPiece] = useState("");
  const [piecesCheck, setPiecesCheck] = useState(null);
  //Bi directional Map for doing space math better
  const keysForSpaceMath = {
    a1: "11",
    b1: "21",
    c1: "31",
    d1: "41",
    e1: "51",
    f1: "61",
    g1: "71",
    h1: "81",
    a2: "12",
    b2: "22",
    c2: "32",
    d2: "42",
    e2: "52",
    f2: "62",
    g2: "72",
    h2: "82",

    a8: "18",
    b8: "28",
    c8: "38",
    d8: "48",
    e8: "58",
    f8: "68",
    g8: "78",
    h8: "88",
    a7: "17",
    b7: "27",
    c7: "37",
    d7: "47",
    e7: "57",
    f7: "67",
    g7: "77",
    h7: "87",

    a3: "13",
    b3: "23",
    c3: "33",
    d3: "43",
    e3: "53",
    f3: "63",
    g3: "73",
    h3: "83",
    a4: "14",
    b4: "24",
    c4: "34",
    d4: "44",
    e4: "54",
    f4: "64",
    g4: "74",
    h4: "84",
    a5: "15",
    b5: "25",
    c5: "35",
    d5: "45",
    e5: "55",
    f5: "65",
    g5: "75",
    h5: "85",
    a6: "16",
    b6: "26",
    c6: "36",
    d6: "46",
    e6: "56",
    f6: "66",
    g6: "76",
    h6: "86",

    11: "a1",
    21: "b1",
    31: "c1",
    41: "d1",
    51: "e1",
    61: "f1",
    71: "g1",
    81: "h1",
    12: "a2",
    22: "b2",
    32: "c2",
    42: "d2",
    52: "e2",
    62: "f2",
    72: "g2",
    82: "h2",

    18: "a8",
    28: "b8",
    38: "c8",
    48: "d8",
    58: "e8",
    68: "f8",
    78: "g8",
    88: "h8",
    17: "a7",
    27: "b7",
    37: "c7",
    47: "d7",
    57: "e7",
    67: "f7",
    77: "g7",
    87: "h7",

    13: "a3",
    23: "b3",
    33: "c3",
    43: "d3",
    53: "e3",
    63: "f3",
    73: "g3",
    83: "h3",
    14: "a4",
    24: "b4",
    34: "c4",
    44: "d4",
    54: "e4",
    64: "f4",
    74: "g4",
    84: "h4",
    15: "a5",
    25: "b5",
    35: "c5",
    45: "d5",
    55: "e5",
    65: "f5",
    75: "g5",
    85: "h5",
    16: "a6",
    26: "b6",
    36: "c6",
    46: "d6",
    56: "e6",
    66: "f6",
    76: "g6",
    86: "h6",
  };

  //This may be used to change the color of the selected space for some more user feedback
  // const [currentSpaceSelected, setCurrentSpaceSelected] = useState("");

  const clickedPieceCheck = (space) => {
    //Check to see if a move is attempted
    //Click the piece you would like to move then click the space you would like to go to

    const currentSpace = space;
    const currentPiece = props.gameState[currentSpace];
    //Helps understand what pieces are selected

    console.log(
      "Curent piece: " + currentPiece + "Current space: " + currentSpace
    );
    console.log(
      "Previous piece: " +
        lastSelectedPiece +
        "Previous space: " +
        lastSelectedSpace
    );

    //Calls the parent Move Piece function if certain conditions are met
    if (availableMoves.includes(currentSpace)) {
      if (true) {
        let oponentColor = "";
        props.turn === "w" ? (oponentColor = "b") : (oponentColor = "w");
        let tempGameState = { ...props.gameState };

        tempGameState[lastSelectedSpace] = "";
        tempGameState[currentSpace] = lastSelectedPiece;
        console.log(tempGameState[lastSelectedSpace]);
        console.log(props.gameState[lastSelectedSpace]);
        console.log(props.gameState);
        let kingLocation = getKeyByValue(tempGameState, oponentColor + "King1");
        console.log(kingLocation + " : " + oponentColor);
        let kingCheckbool = kingCheck(
          kingLocation,
          oponentColor,
          tempGameState
        );
        if (kingCheckbool) {
          console.log(isCheckMate(kingLocation, oponentColor, tempGameState));
          setPiecesCheck(oponentColor + "King1");
        } else {
          setPiecesCheck(null);
        }
        //Need to call checkKing here to see if you will put yourself in check
        props.movePiece(
          lastSelectedSpace,
          currentSpace,
          lastSelectedPiece,
          props.username
        );

        setLastSelectedPiece("");
        setLastSelectedSpace("");
        setAvailableMoves([]);
      }
    } else {
      setLastSelectedPiece(currentPiece);
      setLastSelectedSpace(currentSpace);
    }
    //Sets the last selected space and piece so it will be stored even when DOM refreshes
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const spaceMathString = (location, x, y) => {
    let result = location;
    let numericLocation = keysForSpaceMath[location];
    let xComponet = parseInt(numericLocation[0]) + x;
    let yComponet = parseInt(numericLocation[1]) + y;
    result = keysForSpaceMath[xComponet.toString() + yComponet.toString()];
    return result;
  };

  const spaceMathInt = (location, x, y) => {
    let result = location;
    let numericLocation = keysForSpaceMath[location];
    let xComponet = parseInt(numericLocation[0]) + x;
    let yComponet = parseInt(numericLocation[1]) + y;
    result = [xComponet, yComponet];
    return result;
  };

  const ideratedChecks = (
    location,
    x,
    y,
    options,
    color,
    gameStateUsed = props.gameState
  ) => {
    let xlocation = parseInt(keysForSpaceMath[location][0]);
    let ylocation = parseInt(keysForSpaceMath[location][1]);
    let nextSpacePiece = "";
    let iteratedLocation = location;

    while (
      xlocation + x > 0 &&
      ylocation + y > 0 &&
      xlocation + x < 9 &&
      ylocation + y < 9
    ) {
      nextSpacePiece = gameStateUsed[spaceMathString(iteratedLocation, x, y)];

      if (nextSpacePiece === "" || nextSpacePiece[0] !== color) {
        options.push(spaceMathString(iteratedLocation, x, y));
      }
      if (
        (nextSpacePiece !== "" && nextSpacePiece[0] !== color) ||
        (nextSpacePiece !== "" && nextSpacePiece[0] === color)
      ) {
        break;
      }

      iteratedLocation = spaceMathString(iteratedLocation, x, y);
      xlocation = xlocation + x;
      ylocation = ylocation + y;
    }
    // console.log(options);
    return options;
  };

  const pawnMoves = (location, color) => {
    let numericLocation = keysForSpaceMath[location];

    // console.log(spaceMathString(location, 1, 0));
    let distance = 1;
    if (location[1] === "7" || location[1] === "2") {
      distance = 2;
    }
    let options = [];
    for (let i = 1; i <= distance; i++) {
      if (color === "b") {
        if (
          spaceMathInt(location, 1, 1)[0] < 9 &&
          props.gameState[spaceMathString(location, 1, 1)][0] === "w"
        ) {
          options.push(spaceMathString(location, 1, 1));
        }
        if (
          spaceMathInt(location, -1, 1)[0] > 0 &&
          props.gameState[spaceMathString(location, -1, 1)][0] === "w"
        ) {
          options.push(spaceMathString(location, -1, 1));
        }
        if (props.gameState[spaceMathString(location, 0, i)] === "") {
          options.push(spaceMathString(location, 0, i));
        } else {
          break;
        }
      } else if (color === "w") {
        if (
          spaceMathInt(location, 1, -1)[0] < 9 &&
          props.gameState[spaceMathString(location, 1, -1)][0] === "b"
        ) {
          options.push(spaceMathString(location, 1, -1));
        }
        if (
          spaceMathInt(location, -1, -1)[0] > 0 &&
          props.gameState[spaceMathString(location, -1, -1)][0] === "b"
        ) {
          options.push(spaceMathString(location, -1, -1));
        }
        if (props.gameState[spaceMathString(location, 0, -i)] === "") {
          options.push(spaceMathString(location, 0, -i));
        } else {
          break;
        }
      }
    }
    let kingLocation = getKeyByValue(props.gameState, color + "King1");
    let willCheck = null;
    let finalOptions = [];
    for (const move of options) {
      let tempGameState = { ...props.gameState };
      // console.log(move);

      tempGameState[move] = color + "Pawn1";
      tempGameState[location] = "";
      willCheck = kingCheck(kingLocation, color, tempGameState);
      console.log(willCheck);
      if (!willCheck) {
        finalOptions.push(move);
      }
    }

    return finalOptions;
  };

  const bishopMoves = (location, color) => {
    let options = [];
    const directions = [-1, 1];

    for (const x of directions) {
      for (const y of directions) {
        const option = ideratedChecks(location, x, y, options, color);
        // options.push(option);
      }
    }

    let kingLocation = getKeyByValue(props.gameState, color + "King1");
    let willCheck = null;
    let finalOptions = [];
    for (const move of options) {
      let tempGameState = { ...props.gameState };
      // console.log(move);

      tempGameState[move] = color + "Queen1";
      tempGameState[location] = "";
      willCheck = kingCheck(kingLocation, color, tempGameState);
      console.log(willCheck);
      if (!willCheck) {
        finalOptions.push(move);
      }
    }

    return finalOptions;
  };

  const rookMoves = (location, color) => {
    let options = [];

    const directions2 = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const direction of directions2) {
      const x = direction[0];
      const y = direction[1];

      const option = ideratedChecks(location, x, y, options, color);
      // options.push(option);
    }
    let kingLocation = getKeyByValue(props.gameState, color + "King1");
    let willCheck = null;
    let finalOptions = [];
    for (const move of options) {
      let tempGameState = { ...props.gameState };
      // console.log(move);

      tempGameState[move] = color + "Rook1";
      tempGameState[location] = "";
      willCheck = kingCheck(kingLocation, color, tempGameState);
      console.log(willCheck);
      if (!willCheck) {
        finalOptions.push(move);
      }
    }

    return finalOptions;
  };

  const queenMoves = (location, color) => {
    let options = [];
    const directions = [-1, 0, 1];

    for (const x of directions) {
      for (const y of directions) {
        const option = ideratedChecks(location, x, y, options, color);
      }
    }
    // console.log(options);
    let kingLocation = getKeyByValue(props.gameState, color + "King1");
    let willCheck = null;
    let finalOptions = [];
    for (const move of options) {
      let tempGameState = { ...props.gameState };
      // console.log(move);

      tempGameState[move] = color + "Queen1";
      tempGameState[location] = "";
      willCheck = kingCheck(kingLocation, color, tempGameState);
      console.log(willCheck);
      if (!willCheck) {
        finalOptions.push(move);
      }
    }
    return finalOptions;
  };

  const kingCheck = (location, color, gameStateUsed) => {
    let optionsDiag = [];
    const directions = [-1, 1];

    for (const x of directions) {
      for (const y of directions) {
        const option = ideratedChecks(
          location,
          x,
          y,
          optionsDiag,
          color,
          gameStateUsed
        );

        // optionsDiag.push(option);
      }
    }

    let optionsLinear = [];

    const directions2 = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const direction of directions2) {
      const x = direction[0];
      const y = direction[1];

      const option = ideratedChecks(
        location,
        x,
        y,
        optionsLinear,
        color,
        gameStateUsed
      );
      // optionsLinear.push(option);
    }

    let optionsKnight = [];
    const directionsK = [
      [2, 1],
      [-2, 1],
      [2, -1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    for (const direction of directionsK) {
      const x = direction[0];
      const y = direction[1];

      let xlocation = parseInt(keysForSpaceMath[location][0]);
      let ylocation = parseInt(keysForSpaceMath[location][1]);
      let nextSpacePiece = "";
      let iteratedLocation = location;

      while (
        xlocation + x > 0 &&
        ylocation + y > 0 &&
        xlocation + x < 9 &&
        ylocation + y < 9
      ) {
        nextSpacePiece = gameStateUsed[spaceMathString(iteratedLocation, x, y)];
        // console.log(nextSpacePiece);
        if (nextSpacePiece === "" || nextSpacePiece[0] !== color) {
          optionsKnight.push(spaceMathString(iteratedLocation, x, y));
        }
        if (
          (nextSpacePiece !== "" && nextSpacePiece[0] !== color) ||
          (nextSpacePiece !== "" && nextSpacePiece[0] === color)
        ) {
          break;
        }

        break;
      }
    }

    let optionsPawn = [];

    let xlocation = parseInt(keysForSpaceMath[location][0]);
    let ylocation = parseInt(keysForSpaceMath[location][1]);
    let nextSpacePiece = "";
    let iteratedLocation = location;
    let xD = [-1, 1];

    for (const x of xD) {
      if (
        color === "b" &&
        ylocation < 8 &&
        xlocation + x < 8 &&
        xlocation + x > 0
      ) {
        let y = 1;
        nextSpacePiece = gameStateUsed[spaceMathString(iteratedLocation, x, y)];
        if (nextSpacePiece === "" || nextSpacePiece[0] !== color) {
          optionsPawn.push(spaceMathString(iteratedLocation, x, y));
        }
      } else if (
        color === "w" &&
        ylocation > 0 &&
        xlocation + x < 8 &&
        xlocation + x > 0
      ) {
        let y = -1;
        nextSpacePiece = gameStateUsed[spaceMathString(iteratedLocation, x, y)];
        if (nextSpacePiece === "" || nextSpacePiece[0] !== color) {
          optionsPawn.push(spaceMathString(iteratedLocation, x, y));
        }
      }
    }

    // console.log(optionsDiag);
    // console.log(optionsLinear);
    // console.log(optionsKnight);

    let oponentColor = "";
    color === "w" ? (oponentColor = "b") : (oponentColor = "w");

    for (const space of optionsDiag) {
      // console.log(props.gameState[space]);
      if (
        gameStateUsed[space].includes(oponentColor + "Bishop") ||
        gameStateUsed[space].includes(oponentColor + "Queen")
      ) {
        console.log("CHECK DIAG");
        return true;
      }
    }
    for (const space of optionsLinear) {
      // console.log(props.gameState[space]);
      if (
        gameStateUsed[space].includes(oponentColor + "Rook") ||
        gameStateUsed[space].includes(oponentColor + "Queen")
      ) {
        console.log("CHECK LINEAR");
        return true;
      }
    }
    for (const space of optionsKnight) {
      // console.log(props.gameState[space]);
      if (gameStateUsed[space].includes(oponentColor + "Knight")) {
        console.log("CHECK KNIGHT");
        return true;
      }
    }

    for (const space of optionsPawn) {
      if (gameStateUsed[space].includes(oponentColor + "Pawn")) {
        console.log("check Pawn");
        return true;
      }
    }

    return false;
  };

  const isCheckMate = (location, color, gameStateUse) => {};

  const kingMoves = (location, color) => {
    // kingCheck(location, color);
    let options = [];
    const directions = [-1, 0, 1];

    for (const x of directions) {
      for (const y of directions) {
        let xlocation = parseInt(keysForSpaceMath[location][0]);
        let ylocation = parseInt(keysForSpaceMath[location][1]);
        let nextSpacePiece = "";
        let iteratedLocation = location;
        while (
          xlocation + x > 0 &&
          ylocation + y > 0 &&
          xlocation + x < 9 &&
          ylocation + y < 9
        ) {
          // console.log(xlocation + " " + ylocation);
          nextSpacePiece =
            props.gameState[spaceMathString(iteratedLocation, x, y)];
          // console.log(nextSpacePiece);
          if (nextSpacePiece === "" || nextSpacePiece[0] !== color) {
            options.push(spaceMathString(iteratedLocation, x, y));
          }
          if (
            (nextSpacePiece !== "" && nextSpacePiece[0] !== color) ||
            (nextSpacePiece !== "" && nextSpacePiece[0] === color)
          ) {
            break;
          }

          break;
        }
      }
    }

    let kingLocation = getKeyByValue(props.gameState, color + "King1");
    let willCheck = null;
    let finalOptions = [];
    for (const move of options) {
      let tempGameState = { ...props.gameState };
      // console.log(move);

      tempGameState[move] = color + "King1";
      tempGameState[location] = "";
      willCheck = kingCheck(move, color, tempGameState);
      console.log(willCheck);
      if (!willCheck) {
        finalOptions.push(move);
      }
    }

    return finalOptions;
  };

  const knightMoves = (location, color) => {
    let options = [];
    const directions = [
      [2, 1],
      [-2, 1],
      [2, -1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    for (const direction of directions) {
      const x = direction[0];
      const y = direction[1];

      let xlocation = parseInt(keysForSpaceMath[location][0]);
      let ylocation = parseInt(keysForSpaceMath[location][1]);
      let nextSpacePiece = "";
      let iteratedLocation = location;

      while (
        xlocation + x > 0 &&
        ylocation + y > 0 &&
        xlocation + x < 9 &&
        ylocation + y < 9
      ) {
        nextSpacePiece =
          props.gameState[spaceMathString(iteratedLocation, x, y)];
        // console.log(nextSpacePiece);
        if (nextSpacePiece === "" || nextSpacePiece[0] !== color) {
          options.push(spaceMathString(iteratedLocation, x, y));
        }
        if (
          (nextSpacePiece !== "" && nextSpacePiece[0] !== color) ||
          (nextSpacePiece !== "" && nextSpacePiece[0] === color)
        ) {
          break;
        }

        break;
      }
    }

    let kingLocation = getKeyByValue(props.gameState, color + "King1");
    let willCheck = null;
    let finalOptions = [];
    for (const move of options) {
      let tempGameState = { ...props.gameState };
      // console.log(move);

      tempGameState[move] = color + "Knight1";
      tempGameState[location] = "";
      willCheck = kingCheck(kingLocation, color, tempGameState);
      console.log(willCheck);
      if (!willCheck) {
        finalOptions.push(move);
      }
    }

    return finalOptions;
  };

  const findValidMoves = (pieceName, location) => {
    const pieceColor = pieceName[0];
    const pieceSwitch = pieceName.slice(1, -1);
    let moves = [];
    switch (pieceSwitch) {
      case "Pawn":
        // console.log("pawn" + location);
        props.turn === pieceColor
          ? (moves = pawnMoves(location, pieceColor))
          : (moves = []);

        break;
      case "Rook":
        props.turn === pieceColor
          ? (moves = rookMoves(location, pieceColor))
          : (moves = []);
        // console.log("Rook: " + moves);
        break;
      case "Knight":
        props.turn === pieceColor
          ? (moves = knightMoves(location, pieceColor))
          : (moves = []);
        // console.log("Knight: " + moves);
        break;
      case "Bishop":
        props.turn === pieceColor
          ? (moves = bishopMoves(location, pieceColor))
          : (moves = []);
        // console.log("Bishop: " + moves);
        break;
      case "Queen":
        props.turn === pieceColor
          ? (moves = queenMoves(location, pieceColor))
          : (moves = []);
        // console.log("Queen: " + moves);
        break;
      case "King":
        props.turn === pieceColor
          ? (moves = kingMoves(location, pieceColor))
          : (moves = []);
        // console.log("King: " + moves);
        break;

      default:
      // console.log("blankspace");
    }
    setAvailableMoves(moves);
    // setAvailableMoves(moves);
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
              setCurrentSpaceCheck={setCurrentSpaceCheck} // Not in use yet
              findValidMoves={findValidMoves}
              // currentSpace={currentSpace}
              availableMoves={availableMoves}
              piecesCheck={piecesCheck}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
