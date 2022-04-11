const Games = (props) => {
  const selectGame = () => {
    console.log("Game Info: " + props.gameInfo["gameNumber"]);
    console.log("Turn: " + props.gameInfo["turn"]);

    let retrievedGameState = { ...props.gameInfo };

    delete retrievedGameState["gameNumber"];
    delete retrievedGameState["turn"];
    delete retrievedGameState["userName"];

    console.log(retrievedGameState);
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
        <div>{"Game Number: " + props.gameNumber}</div>
      </button>
    </div>
  );
};

export default Games;
