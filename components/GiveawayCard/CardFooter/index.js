import React from "react";
import { string, number } from "prop-types";
import stylesheet from "./index.css";
import Eye from "../../../static/icons/eye.svg";

function CardFooter(props) {
  const { enteredCount, last_winner } = props;
  return (
    <div className={"giveawayCard--footer"}>
      <div
        className={"views--giveaway"}
        aria-label={`View Count is ${enteredCount}`}
      >
        <Eye />
        <p className={"count"}>{enteredCount}</p>
      </div>
      <p className={"last--winner"}>{last_winner}</p>
      <style jsx>{stylesheet}</style>
    </div>
  );
}

CardFooter.propTypes = {
  last_winner: string.isRequired,
  enteredCount: number.isRequired
};
export default CardFooter;
