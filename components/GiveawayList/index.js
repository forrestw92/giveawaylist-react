import React from "react";
import { array, func, number } from "prop-types";
import GiveawayCard from "../GiveawayCard";

import stylesheet from "./index.css";
import AdCard from "../Adsense/Card";

function GiveawayList(props) {
  const { giveaways, deleteSingleGiveaway, totalGiveaways } = props;
  return (
    <ul className={"list--giveaways"}>
      {giveaways &&
        giveaways.map((giveaway, idx) => {
          if (idx % 6 === 0) {
            return (
              <React.Fragment key={idx}>
                <li className={"giveaway--list--item"} key={idx}>
                  <GiveawayCard
                    key={giveaway.id}
                    {...giveaway}
                    deleteSingleGiveaway={deleteSingleGiveaway}
                  />
                </li>
                <li
                  className={"giveaway--list--item remove-shadow"}
                  key={`adm-${idx}`}
                >
                  <AdCard />
                </li>
              </React.Fragment>
            );
          }
          return (
            <li className={"giveaway--list--item"} key={idx}>
              <GiveawayCard
                key={giveaway.id}
                {...giveaway}
                deleteSingleGiveaway={deleteSingleGiveaway}
              />
            </li>
          );
        })}
      {totalGiveaways === undefined ? (
        <h1 className={"loading"}>Loading</h1>
      ) : totalGiveaways === 0 ? (
        <h1 className={"loading"}>No Giveaways. Reset Filter</h1>
      ) : (
        ""
      )}

      <style jsx>{stylesheet}</style>
    </ul>
  );
}

GiveawayList.propTypes = {
  giveaways: array.isRequired,
  deleteSingleGiveaway: func.isRequired,
  totalGiveaways: number.isRequired
};
export default GiveawayList;
