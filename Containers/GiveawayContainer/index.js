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
        <FilterContainer showHideFAB={showHideFAB} isFABOpen={isFABOpen} />
        <section className={stylesheet.giveawayContainer}>
          {giveaways &&
            giveaways.map(giveaway => (
              <GiveawayCard
                key={giveaway.id}
                {...giveaway}
                deleteSingleGiveaway={deleteSingleGiveaway}
              />
            ))}
          {giveaways.length === 0 && <h1 className={"Loading"}>Loading</h1>}
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
