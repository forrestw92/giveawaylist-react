import React from "react";
import { string, number } from "prop-types";
import { deleteGiveaway } from "../../Redux/actions/giveawayActions";
import stylesheet from "./index.css";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardBody from "./CardBody";
class GiveawayCard extends React.PureComponent {
  handleEnterClick = e => {
    this.props.deleteGiveaway(e);
  };

  render() {
    const {
      id,
      picture,
      name,
      requirement,
      odds,
      giveaway,
      addedDate,
      endDate,
      prize,
      item,
      category,
      winners,
      enteredCount,
      oddsType
    } = this.props;
    return (
      <div className={stylesheet.giveawayCard}>
        <CardHeader name={name} picture={picture} />
        <CardBody
          endDate={endDate}
          addedDate={addedDate}
          prize={prize}
          winners={winners}
          odds={odds}
          requirement={requirement}
          category={category || "Uncategorized"}
          oddsType={oddsType}
        />
        <CardFooter
          giveaway={giveaway}
          enteredCount={enteredCount}
          id={id}
          handleEnterClick={this.handleEnterClick}
        />
      </div>
    );
  }
}

GiveawayCard.propTypes = {
  picture: string,
  name: string,
  requirement: string,
  odds: number,
  giveaway: string,
  isKindle: number,
  addedDate: string,
  endDate: string,
  prize: number,
  item: string,
  category: string,
  winners: number,
  enteredCount: number,
  oddsType: number,
  id: number
};
export default GiveawayCard;
