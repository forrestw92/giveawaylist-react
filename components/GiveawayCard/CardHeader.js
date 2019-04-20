import React from "react";
import stylesheet from "./index.css";
import { string } from "prop-types";
import CardImage from "./CardImage";
class CardHeader extends React.Component {
  render() {
    const { name, picture } = this.props;
    return (
      <div className={stylesheet["giveawayCard--header"]}>
        <CardImage picture={picture} />
        <div className={stylesheet["giveawayCard--itemName"]}>{name}</div>
      </div>
    );
  }
}
CardHeader.propTypes = {
  name: string.isRequired,
  picture: string.isRequired
};
export default CardHeader;
