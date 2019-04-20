import React from "react";
import { func, string } from "prop-types";
import stylesheet from "./index.css";
import Save from "../../static/icons/heart.svg";

class CardActions extends React.Component {
  render() {
    const { handleSaveClick, giveaway } = this.props;
    return (
      <div className={stylesheet["giveawayCard--actions"]}>
        <button
          className={stylesheet["save--giveaway--btn"]}
          onClick={e => handleSaveClick(giveaway, e)}
          aria-label={"Save Giveaway"}
          role={"button"}
          type={"button"}
        >
          <Save className={stylesheet["save--giveaway"]} />
        </button>
      </div>
    );
  }
}
CardActions.propTypes = {
  handleSaveClick: func.isRequired,
  giveaway: string.isRequired
};
export default CardActions;
