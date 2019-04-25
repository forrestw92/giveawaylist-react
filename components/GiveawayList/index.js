import React from "react";
import { array, func, number } from "prop-types";
import GiveawayCard from "../GiveawayCard";

import stylesheet from "./index.css";
class GiveawayList extends React.Component {
  render() {
    const { giveaways, deleteSingleGiveaway, totalGiveaways } = this.props;
    return (
      <ul className={"list--giveaways"}>
        {giveaways &&
          giveaways.map((giveaway, idx) => (
            <li className={"giveaway--list--item"} key={idx}>
              <GiveawayCard
                key={giveaway.id}
                {...giveaway}
                deleteSingleGiveaway={deleteSingleGiveaway}
              />
            </li>
          ))}
        {totalGiveaways === undefined ? (
          <h1>Loading</h1>
        ) : totalGiveaways === 0 ? (
          <h1>No Giveaways. Reset Filter</h1>
        ) : (
          ""
        )}

        <style jsx>{stylesheet}</style>
      </ul>
    );
  }
}

GiveawayList.propTypes = {
  giveaways: array.isRequired,
  deleteSingleGiveaway: func.isRequired,
  totalGiveaways: number.isRequired
};
export default GiveawayList;
