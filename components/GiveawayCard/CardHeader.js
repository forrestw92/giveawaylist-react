import React from "react";
import stylesheet from "./index.css";
import { string } from "prop-types";
import CardImage from "./CardImage";
const CardHeader = props => {
  return (
    <div className={stylesheet["giveawayCard--header"]}>
      <CardImage picture={props.picture} />
      <div className={stylesheet["giveawayCard--itemName"]}>{props.name}</div>
    </div>
  );
};
CardHeader.propTypes = {
  name: string.isRequired,
  picture: string.isRequired
};
export default CardHeader;
