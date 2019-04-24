import React from "react";
import { func, string } from "prop-types";
import Save from "../../../static/icons/heart.svg";
import stylesheet from "./index.css";
class CardActions extends React.Component {
  render() {
    const { handleSaveClick, giveaway } = this.props;
    return (
      <div className={"giveawayCard--actions"}>
        <button
          className={"save--giveaway--btn"}
          onClick={e => handleSaveClick(giveaway, e)}
          aria-label={"Save Giveaway"}
          role={"button"}
          type={"button"}
        >
          <Save className={"save--giveaway"} />
        </button>
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}
CardActions.propTypes = {
  handleSaveClick: func.isRequired,
  giveaway: string.isRequired
};
export default CardActions;
