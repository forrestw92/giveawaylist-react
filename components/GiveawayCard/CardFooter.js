import React from "react";
import stylesheet from "./index.css";
import { string, number } from "prop-types";
import Eye from "../../static/icons/eye.svg";
class CardFooter extends React.Component {
  render() {
    const { enteredCount, last_winner } = this.props;
    return (
      <div className={stylesheet["giveawayCard--footer"]}>
        <div
          className={stylesheet["views--giveaway"]}
          aria-label={`View Count is ${enteredCount}`}
        >
          <Eye />
          <p className={stylesheet.count}>{enteredCount}</p>
        </div>
        <p className={stylesheet["last--winner"]}>{last_winner}</p>
      </div>
    );
  }
}
CardFooter.propTypes = {
  last_winner: string.isRequired,
  enteredCount: number.isRequired
};
export default CardFooter;
