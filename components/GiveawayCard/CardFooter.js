import React from "react";
import stylesheet from "./index.css";
import { string, number, func } from "prop-types";

const CardFooter = props => {
  return (
    <div className={stylesheet["giveawayCard--footer"]}>
      <img
        src={"../../static/icons/heart.svg"}
        alt={"Save Giveaway"}
        className={stylesheet["save--giveaway"]}
      />

      <div className={stylesheet["views--giveaway"]}>
        <img src={"../../static/icons/eye.svg"} alt={"View Count"} />
        <span className={stylesheet.count}>{props.enteredCount}</span>
      </div>
      {/*TODO On enter giveaway hide from list? Flip Over? And Send to server*/}
      <a
        href={props.giveaway}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => props.handleEnterClick(props.id)}
      >
        <img
          src={"../../static/icons/play.svg"}
          alt={"Enter Giveaway"}
          className={stylesheet["enter--giveaway"]}
        />
      </a>
    </div>
  );
};
CardFooter.propTypes = {
  giveaway: string.isRequired,
  id: number.isRequired,
  enteredCount: number.isRequired,
  handleEnterClick: func.isRequired
};
export default CardFooter;
