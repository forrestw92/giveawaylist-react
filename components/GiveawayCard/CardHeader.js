import React from "react";
import stylesheet from "./index.css";
import { string } from "prop-types";
import CardImage from "./CardImage";
import ClampLines from "react-clamp-lines";
const CardHeader = props => {
  return (
    <div className={stylesheet["giveawayCard--header"]}>
      <CardImage picture={props.picture} />

      <ClampLines
        text={props.name}
        lines="2"
        ellipsis="..."
        buttons={false}
        className={stylesheet["giveaway--name"]}
      />
    </div>
  );
};
CardHeader.propTypes = {
  name: string.isRequired,
  picture: string.isRequired
};
export default CardHeader;
