import React from "react";
import stylesheet from "./index.css";
import { string } from "prop-types";
import CardImage from "./CardImage";
import ClampLines from "react-clamp-lines";
const CardHeader = props => {
  return (
    <div className={stylesheet["giveawayCard--header"]}>
      <CardImage picture={props.picture} />
      <span>
        <ClampLines
          text={props.name}
          lines="2"
          ellipsis="..."
          buttons={false}
        />
      </span>
    </div>
  );
};
CardHeader.propTypes = {
  name: string.isRequired,
  picture: string.isRequired
};
export default CardHeader;
