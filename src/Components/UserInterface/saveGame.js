import "./saveGame.css";
import axios from "axios";

function hoverIn(event) {
  event.target.style.background = "#eeebeb";
}

function hoverOut(event) {
  event.target.style.background = "white";
}

function SaveGame(props) {
  function saveGameButton() {
    const saveAPI =
      "https://k2flzsd971.execute-api.us-east-2.amazonaws.com/dev";

    const data = {
      userName: props.username,
      gameNumber: props.gameNumber,
      turn: props.turn,
      ...props.gameState,
    };

    // console.log(data);

    axios

      //post the desired move and the current gameState to the API to check the move
      .post(saveAPI, data)
      //Get response
      .then((response) => {
        //Checking format and returning response
        console.log(response["data"]["body"]);
        props.saveGameMessage(response["data"]["body"]);
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
  }

  async function getGame() {
    const getAPI =
      "https://lqzqanzyeh.execute-api.us-east-2.amazonaws.com/default";
    let retrievedGameState = {
      //   userName: "testUser",
      //   gameNumber: "1",
      //   turn: props.turn,
      //   ...props.gameStateStart,
    };

    let gameNumber = props.gameNumber;
    let turn = "";
    let userName = "";

    await axios

      //post the desired move and the current gameState to the API to check the move
      .post(getAPI, { userName: props.username, gameNumber: props.gameNumber })
      //Get response
      .then((response) => {
        // console.log(response);
        //Checking format and returning response
        retrievedGameState = response["data"]["gameState"];
        console.log(response["data"]["gameState"]);
        console.log(response["data"]);
        gameNumber = response["data"]["gameNumber"];
        turn = response["data"]["gameState"]["turn"];
        userName = response["data"]["userName"];
      })
      //catch an error
      .catch((error) => {
        console.log(error);
      });
    delete retrievedGameState["gameNumber"];
    delete retrievedGameState["turn"];
    delete retrievedGameState["userName"];

    // console.log(retrievedGameState);
    props.changeGame(retrievedGameState, userName, gameNumber, turn);
  }

  return (
    <div>
      <button
        className="saveGameButton"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onClick={saveGameButton}
      >
        Save Game
      </button>
      {/* <button
        className="saveGameButton"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onClick={getGame}
      >
        Retrieve Game
      </button> */}
    </div>
  );
}

export default SaveGame;
