import React from "react";
import { array, func } from "prop-types";
import GiveawayCard from "../GiveawayCard";

import stylesheet from "./index.css";
class GiveawayList extends React.Component {
  render() {
    const { giveaways, deleteSingleGiveaway } = this.props;
    return (
      <section className={stylesheet["list--giveaways"]}>
        {giveaways &&
          giveaways.map(giveaway => (
            <GiveawayCard
              key={giveaway.id}
              {...giveaway}
              deleteSingleGiveaway={deleteSingleGiveaway}
            />
          ))}
        {giveaways.length === 0 && <h1>Loading</h1>}
      </section>
    );
  }
}

GiveawayList.propTypes = {
  giveaways: array.isRequired,
  deleteSingleGiveaway: func.isRequired
};
export default GiveawayList;