import React from "react";
import { string } from "prop-types";
import GiveawayCard from "../../components/GiveawayCard";
import stylesheet from "./index.css";
class GiveawayContainer extends React.Component {
  render() {
    const { giveaways, deleteGiveaway } = this.props;
    return (
      <section className={stylesheet.giveawayContainer}>
        {giveaways &&
          giveaways.map((giveaway, index) => (
            <GiveawayCard
              key={index}
              {...giveaway}
              deleteGiveaway={deleteGiveaway}
            />
          ))}
        {!giveaways && <h1 className={"Loading"}>Loading</h1>}
      </section>
    );
  }
}
export default GiveawayContainer;
