import React from "react";
import { array, func, string } from "prop-types";
import GiveawayCard from "../../components/GiveawayCard";
import stylesheet from "./index.css";
class GiveawayContainer extends React.Component {
  render() {
    const { giveaways, deleteSingleGiveaway, title } = this.props;

    return (
      <main role="main" className={stylesheet.giveawayContainer}>
        <h1 className={stylesheet.title}>{title}</h1>
        {giveaways &&
          giveaways.map(giveaway => (
            <GiveawayCard
              key={giveaway.id}
              {...giveaway}
              deleteSingleGiveaway={deleteSingleGiveaway}
            />
          ))}
        {giveaways.length === 0 && <h1 className={"Loading"}>Loading</h1>}
      </main>
    );
  }
}
GiveawayContainer.propTypes = {
  giveaways: array.isRequired,
  deleteSingleGiveaway: func.isRequired,
  title: string.isRequired
};
export default GiveawayContainer;
