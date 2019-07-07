import React from "react";
import { string } from "prop-types";
import CardImage from "./CardImage";
import stylesheet from "./index.css";
function CardHeader(props) {
  const { name, picture, giveawayID } = props;
  return (
    <div className={"giveawayCard--header"}>
      <CardImage picture={picture} giveawayID={giveawayID} />
      <div className={"giveawayCard--itemName"}>{name}</div>
      <style jsx>{stylesheet}</style>
    </div>
  );
}

CardHeader.propTypes = {
  name: string.isRequired,
  picture: string.isRequired,
  giveawayID: string.isRequired
};
export default CardHeader;
