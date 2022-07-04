import React, { useState } from "react";
import GameList from "../GameSelection/GameList";

const MenuSelection = (props) => {
  const [menuScreen, setMenuScreen] = useState("main");
  const [gameInput, setGameInput] = useState("");

  const newGameMenu = () => {
    setMenuScreen("newGame");
  };
  const mainMenu = () => {
    setMenuScreen("main");
  };
  const newMultiplayer = () => {
    setMenuScreen("multiplayer");
    // props.setModalVis(true);
    // props.setModalButtonsOk(true);
  };
  const newGameLocal = async () => {
    // console.log("New Game Number: " + newGameNumber);
    // props.changeGame(props.newGameState, props.username, newGameNumber, "w");
    await props.saveGame(props.username); //Save the new game with the newgamenumber
    props.getUserGamesTest();
    // props.gameVisible(true); //Display the newgame
    // toggleGameListVisible(false); //Turn off the game list menu
    await setMenuScreen("main");

    // props.changeGame(props.gameStateStart, props.userName, newGameNumber, "w");
  };

  const newNetworkGame = async () => {
    await props.saveGame(
      props.username,
      gameInput["enteredGameNumber"],
      false,
      true
    );
    await props.getUserGamesTest();
    await setMenuScreen("main");
    // newMultiplayer("muliplayer");
  };

  const joinNetworkGames = async () => {
    console.log("Join");
    // props.setModalMessage({
    //   title: "Multiplayer games in progress",
    //   body: "Please go back",
    // });
    setMenuScreen("joinNetwork");
  };

  const gamenumberHandler = (event) => {
    // console.log(event.target.value);
    setGameInput((prevState) => {
      return { ...prevState, enteredGameNumber: event.target.value };
    });
    // console.log(gameInput);
  };

  const signOutHandler = () => {
    props.setGameListsTest([]);
    props.signOut();
  };

  const joinGame = async () => {
    await props.saveGame(
      props.username,
      gameInput["enteredGameNumber"],
      true,
      true
    );
    await props.getUserGamesTest();
  };

  return (
    <div>
      {menuScreen === "newGame" && (
        <div className="column">
          <button className="newGameButton" onClick={newGameLocal}>
            New Local Game
          </button>
          <button className="GameButton" onClick={newNetworkGame}>
            Create Multiplayer Game
          </button>

          <input
            className="newGameButton"
            type="text"
            id="gameNumber"
            placeholder="Enter Game Number"
            maxLength={4}
            onChange={gamenumberHandler}
          ></input>
          <button className="GameButton" onClick={joinGame}>
            Join Game
          </button>
          <button className="signOutButton" onClick={mainMenu}>
            Back
          </button>
        </div>
      )}

      {menuScreen === "multiplayer" && (
        <div className="column">
          <button className="newGameButton" onClick={newNetworkGame}>
            Create New Game
          </button>
          <button className="GameButton" onClick={joinNetworkGames}>
            Join Game
          </button>
          <button className="signOutButton" onClick={newGameMenu}>
            Back
          </button>
        </div>
      )}

      {menuScreen === "joinNetwork" && (
        <div className="column">
          <button className="GameButton" onClick={joinGame}>
            Join Game
          </button>
          <input
            className="newGameButton"
            type="text"
            id="gameNumber"
            placeholder="Enter Game Number"
            maxLength={4}
            onChange={gamenumberHandler}
          ></input>
          <button className="signOutButton" onClick={newMultiplayer}>
            Back
          </button>
        </div>
      )}

      {menuScreen === "main" && props.gameListVisibleTest && (
        <button className="newGameButton" onClick={newGameMenu}>
          New Game
        </button>
      )}
      {menuScreen === "main" && (
        <GameList
          username={props.username}
          gameNumber={props.gameNumber}
          changeGame={props.changeGame}
          newGameState={props.newGameState}
          gameVisible={props.gameVisible}
          saveGame={props.saveGame}
          signOut={props.signOut}
          turn={props.turn}
          getToken={props.getToken}
          authToken={props.authToken}
          deleteGameModal={props.deleteGameModal}
          gameListVisibleTest={props.gameListVisibleTest}
          toggleGameListVisibleTest={props.toggleGameListVisibleTest}
          getUserGamesTest={props.getUserGamesTest}
          gameListsTest={props.gameListsTest}
        ></GameList>
      )}
      {menuScreen === "main" && props.gameListVisibleTest && (
        <button className="signOutButton" onClick={signOutHandler}>
          Sign out
        </button>
      )}
    </div>
  );
};

export default MenuSelection;
