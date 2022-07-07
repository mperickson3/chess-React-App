import React from "react";
import "./MenuTitle.css";
import Back from "../Icons/Back.png";
import Trash from "../Icons/garbage.png";

const MenuTitle = (props) => {
  const clickHandler = () => [props.setMenuScreen("multiplayer")];

  const backClickHandler = () => {
    props.backSelect();
  };

  const deleteGameConfirm = () => {
    props.deleteGameModal(props.username, props.gameNumber);
  };

  return (
    <div>
      <div className="MenuBox">
        <div className="buttonContainer" onClick={backClickHandler}>
          <img src={Back} className="backB" alt="Menu" />
        </div>
        <div className="menuName">{props.MenuTitle}</div>

        <div className="buttonContainer" onClick={deleteGameConfirm}>
          {props.menuScreen === "game" && (
            <img src={Trash} className="backB" alt="Trash" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuTitle;
