import React from "react";
import { string, number, func } from "prop-types";
import stylesheet from "./index.css";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import CardBody from "./CardBody";
import { enterGiveaway, saveGiveaway } from "../../API";
class GiveawayCard extends React.PureComponent {
  handleEnterClick = (id, giveaway) => {
    enterGiveaway(giveaway)
      .then(res => {
        if (res.data.success) {
          this.props.deleteSingleGiveaway(id);
        }
      })
      //TODO: Handle enter giveaway error
      .catch(error => console.log(error));
  };
  handleSaveClick = giveaway => {
    saveGiveaway(giveaway)
      .then(res => {
        if (res.data.success) {
          //TODO: Alert user of saved giveaway
        }
      })
      //TODO: Handle enter giveaway error
      .catch(error => console.log(error));
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
          handleSaveClick={this.handleSaveClick}
          handleEnterClick={this.handleEnterClick}
        />
      </div>
    );
  }
}

GiveawayCard.propTypes = {
  deleteSingleGiveaway: func.isRequired,
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
