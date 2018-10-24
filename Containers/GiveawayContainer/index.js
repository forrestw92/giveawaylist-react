import React from "react";
import { array, func, bool } from "prop-types";
import GiveawayCard from "../../components/GiveawayCard";
import stylesheet from "./index.css";
import FilterContainer from "../FilterContainer";
class GiveawayContainer extends React.Component {
  render() {
    const {
      giveaways,
      deleteSingleGiveaway,
      showHideFAB,
      isFABOpen
    } = this.props;

    return (
      <React.Fragment>
        <div
          className={
            isFABOpen
              ? stylesheet["over--lay"]
              : stylesheet["over--lay"] + " " + stylesheet["hide"]
          }
        />
        <FilterContainer showHideFAB={showHideFAB} isFABOpen={isFABOpen} />
        <section className={stylesheet.giveawayContainer}>
          {giveaways &&
            giveaways.map((giveaway, index) => (
              <GiveawayCard
                key={index}
                {...giveaway}
                deleteSingleGiveaway={deleteSingleGiveaway}
              />
            ))}
          {!giveaways && <h1 className={"Loading"}>Loading</h1>}
        </section>
      </React.Fragment>
    );
  }
}
GiveawayContainer.propTypes = {
  giveaways: array.isRequired,
  deleteSingleGiveaway: func.isRequired,
  showHideFAB: func.isRequired,
  isFABOpen: bool.isRequired
};
export default GiveawayContainer;
