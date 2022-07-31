import Icons from "../Icons/Icons";

const CapturedPieces = (props) => {
  const getWhiteCaptured = (gamesState) => {};
  let blackCapturesOptions = [
    "bPawn",
    "bPawn",
    "bPawn",
    "bPawn",
    "bPawn",
    "bPawn",
    "bPawn",
    "bPawn",
    "bBishop",
    "bKnight",
    "bQueen",
    "bRook",
  ];

  const getBlackCaptured = (gamesState) => {};
  let whiteCapturesOptions = [
    "wPawn",
    "wPawn",
    "wPawn",
    "wPawn",
    "wPawn",
    "wPawn",
    "wPawn",
    "wPawn",
    "wBishop",
    "wKnight",
    "wQueen",
    "wRook",
  ];
  let whiteCaptures = [];
  let blackCaptures = [];
  let values = [];
  for (const [key, value] of Object.entries(props.gameState)) {
    let value1 = value.slice(0, -1);
    // console.log(value1);
    values.push(value1);
    if (value1 != "" && whiteCapturesOptions.includes(value1)) {
      //   whiteCaptures.push(value1);
      //   console.log("In HEREEEREE");
    }
  }

  //   console.log(values);
  let i = 0;

  //   whiteCaptures = whiteCapturesOptions.filter(function (value, index, arr) {
  //     return arr.includes(value);
  //   });

  for (const color of ["w", "b"]) {
    let bishops = 2;
    let queens = 1;
    let rooks = 2;
    let knights = 2;
    let pawns = 8;

    for (const value of values) {
      switch (value) {
        case color + "Pawn":
          pawns = pawns - 1;
          break;
        case color + "Bishop":
          bishops = bishops - 1;
          break;
        case color + "Knight":
          knights = knights - 1;
          break;
        case color + "Rook":
          rooks = rooks - 1;
          break;
        case color + "Queen":
          queens = queens - 1;
          break;
        default:
          break;
      }
    }
    let captures = [];

    // console.log(bishops);
    for (let i = 0; i < pawns; i++) {
      captures.push(color + "Pawn" + i.toString());
    }
    for (let i = 0; i < knights; i++) {
      captures.push(color + "Knight" + i.toString());
    }
    for (let i = 0; i < bishops; i++) {
      captures.push(color + "Bishop" + i.toString());
    }
    for (let i = 0; i < rooks; i++) {
      captures.push(color + "Rook" + i.toString());
    }
    for (let i = 0; i < queens; i++) {
      captures.push(color + "Queen" + i.toString());
    }

    if (color === "w") {
      whiteCaptures = captures;
    } else {
      blackCaptures = captures;
    }
  }

  // console.log(whiteCaptures[0].slice(0, -1));

  return (
    <div>
      {props.color === "whitePlayer" && (
        <div className="capturesContainer">
          {blackCaptures.map((piece) => {
            return (
              <img
                src={Icons[piece.slice(0, -1)]}
                alt=""
                className="smallPiece"
                key={piece}
              />
            );
          })}
        </div>
      )}
      {props.color === "blackPlayer" && (
        <div className="capturesContainer">
          {whiteCaptures.map((piece) => {
            return (
              <img
                src={Icons[piece.slice(0, -1)]}
                alt=""
                className="smallPiece"
                key={piece}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CapturedPieces;
