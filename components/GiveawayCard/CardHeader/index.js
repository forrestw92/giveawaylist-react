import React from "react";
import { string } from "prop-types";
import CardImage from "./CardImage";
import stylesheet from "./index.css";
class CardHeader extends React.Component {
  render() {
    const { name, picture } = this.props;
    return (
      <div className={"giveawayCard--header"}>
        <CardImage picture={picture} />
        <div className={"giveawayCard--itemName"}>{name}</div>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}
CardHeader.propTypes = {
  name: string.isRequired,
  picture: string.isRequired
};
export default CardHeader;
