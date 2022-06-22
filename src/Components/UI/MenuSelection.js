import React, { useState } from "react";
import GameList from "../GameSelection/GameList";

const MenuSelection = (props) => {
  const [menuScreen, setMenuScreen] = useState("main");

  const newGameMenu = () => {
    setMenuScreen("newGame");
  };
  const mainMenu = () => {
    setMenuScreen("main");
  };
  const newMultiplayer = () => {
    setMenuScreen("multiplayer");
    props.setModalVis(true);
    props.setModalButtonsOk(true);
  };
  const newGameLocal = async () => {
    // let newGameNumber = (gameLists.length + 1).toString();
    let newGameNumber = "0";
    if (props.gameListsTest.length > 0) {
      //If there are games in the game list set the new game number to 1 higher than the Highest internal unique gamenumber ID
      newGameNumber = (
        parseInt(
          props.gameListsTest[props.gameListsTest.length - 1]["gameNumber"]
        ) + 1
      ).toString();
    }

    console.log("New Game Number: " + newGameNumber);
    // props.changeGame(props.newGameState, props.username, newGameNumber, "w");
    await props.saveGame(props.username, "w", newGameNumber, true); //Save the new game with the newgamenumber
    props.getUserGamesTest();
    // props.gameVisible(true); //Display the newgame
    // toggleGameListVisible(false); //Turn off the game list menu
    setMenuScreen("main");

    // props.changeGame(props.gameStateStart, props.userName, newGameNumber, "w");
  };

  const newNetworkGame = async () => {
    console.log("New");
    props.setModalMessage({
      title: "Multiplayer games in progress",
      body: "Please go back",
    });
    newMultiplayer("muliplayer");
  };

  const joinNetworkGames = async () => {
    console.log("Join");
    props.setModalMessage({
      title: "Multiplayer games in progress",
      body: "Please go back",
    });
    newMultiplayer("muliplayer");
  };

  return (
    <div>
      {menuScreen === "newGame" && (
        <div className="column">
          <button className="newGameButton" onClick={newGameLocal}>
            New Local Game
          </button>
          <button className="GameButton" onClick={newNetworkGame}>
            New Multiplayer Game
          </button>
          <button className="signOutButton" onClick={mainMenu}>
            Game Selection
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
          <button className="signOutButton" onClick={mainMenu}>
            Game Selection
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
        <button className="signOutButton" onClick={props.signOut}>
          Sign out
        </button>
      )}
    </div>
  );
};

export default MenuSelection;
