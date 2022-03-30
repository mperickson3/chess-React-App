import React, { useState } from "react";
import SaveGameConfirm from "./saveGameConfirm";
import SaveGame from "./saveGame";
import "./NavBar.css";

const NavBar = (props) => {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    if (navVisible ? setNavVisible(false) : setNavVisible(true));
  };

  return (
    <div>
      <button onClick={toggleNav} className="navButton">
        | | |
      </button>
      {/* <div className="navContainer"> */}
      {navVisible === false ? (
        <div />
      ) : (
        <div className="navContainer">
          {/* <button onClick={toggleNav} className="navButton">
            | | |
          </button> */}
          <SaveGameConfirm saveMessage={props.saveMessage} />
          <div className="row">
            <button className="saveGameButton" onClick={props.signOut}>
              Sign out {props.username}
            </button>
            {/*render board*/}

            <SaveGame
              gameState={props.gameState}
              turn={props.turn}
              changeGame={props.changeGame}
              gameStateStart={props.gameStateStart}
              username={props.username}
              gameNumber={props.gameNumber}
              saveGameMessage={props.saveGameMessage}
            />
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default NavBar;
