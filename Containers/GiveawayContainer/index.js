import React from "react";
import { array, func } from "prop-types";
import GiveawayCard from "../../components/GiveawayCard";
import stylesheet from "./index.css";
import FilterContainer from "../FilterContainer";
class GiveawayContainer extends React.Component {
  render() {
    const { giveaways, deleteSingleGiveaway } = this.props;
    return (
      <React.Fragment>
        <FilterContainer />
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
  deleteSingleGiveaway: func.isRequired
};
export default GiveawayContainer;
