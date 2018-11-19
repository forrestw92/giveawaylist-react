import React from "react";
import stylesheet from "./index.css";
import { string, number, func } from "prop-types";
import Save from "../../static/icons/heart.svg";
import Enter from "../../static/icons/play.svg";
import Eye from "../../static/icons/eye.svg";
const CardFooter = props => {
  return (
    <div className={stylesheet["giveawayCard--footer"]}>
      <Save className={stylesheet["save--giveaway"]} />
      <div className={stylesheet["views--giveaway"]} aria-label={"View Count"}>
        <Eye />
        <span className={stylesheet.count}>{props.enteredCount}</span>
      </div>
      {/*TODO On enter giveaway hide from list? Flip Over? And Send to server*/}
      <a
        href={props.giveaway}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => props.handleEnterClick(props.id)}
        aria-label={"Enter Giveaway"}
      >
        <Enter className={stylesheet["enter--giveaway"]} />
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
