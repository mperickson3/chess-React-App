import "./Games.css";
import Icon from "../Icons/Icons";
import TurnIndicator from "./TurnIndicator";
import TurnIcon from "./TurnIcon";

const Games = (props) => {
  const selectGame = () => {
    //Select game will take the gameInfo and call the change game function to load the gameState into the board
    //Will also display the board and hide the Game List menu

    let retrievedGameState = { ...props.gameInfo };

    delete retrievedGameState["gameNumber"];
    delete retrievedGameState["turn"];
    delete retrievedGameState["userName"];

    // console.log(retrievedGameState);
    props.changeGame(
      retrievedGameState,
      props.userName,
      props.gameInfo["gameNumber"],
      props.gameInfo["turn"]
    );
    props.setboardVisible(true);
    props.toggleGameListVisible(false);
    props.setMenuScreen("game");
  };

  let gameType = "";
  let oponent = "";
  let yourColor = "";
  if (props.gameInfo["whitePlayer"] === props.gameInfo["blackPlayer"]) {
    gameType = "Single";
  } else {
    gameType = "Multi";
    if (props.gameInfo["blackPlayer"] === "") {
      oponent = "Invite a Player";
      yourColor = "w";
    } else if (props.userName === props.gameInfo["whitePlayer"]) {
      oponent = "VS " + props.gameInfo["blackPlayer"];
      yourColor = "w";
    } else {
      oponent = "VS " + props.gameInfo["whitePlayer"];
      yourColor = "b";
    }
  }

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
    <div className="column">
      <button className="Game" onClick={selectGame}>
        <TurnIcon turn={yourColor}></TurnIcon>
        <img src={Icon[gameType]} className="gameImage"></img>
        <div className="gameMessage">
          <div className="gameTitle">{"Game " + props.gameNumberDisplayed}</div>
          <div className="gameDesc">{oponent}</div>
        </div>
      </button>
    </div>
  );
};

export default Games;
