const Games = (props) => {
  const selectGame = () => {
    //Select game will take the gameInfo and call the change game function to load the gameState into the board
    // //Will also display the board and hide the Game List menu
    // console.log("Game Info: " + props.gameInfo["gameNumber"]);
    // console.log("Turn: " + props.gameInfo["turn"]);

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
    props.gameVisible(true);
    props.toggleGameListVisible(false);
  };

  return (
    <div className="column">
      <button className="saveGameButton" onClick={selectGame}>
        <div>{"Game Number: " + props.gameNumberDisplayed}</div>
      </button>
    </div>
  );
};

export default Games;
