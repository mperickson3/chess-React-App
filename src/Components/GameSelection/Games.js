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
    props.gameVisible(true);
    props.toggleGameListVisible(false);
  };

  return (
    <div className="column">
      <button className="GameButton" onClick={selectGame}>
        <div>{"Game " + props.gameNumberDisplayed}</div>
      </button>
    </div>
  );
};

export default Games;
