import React from "react";
import { string, number } from "prop-types";
import stylesheet from "./index.css";
import GroupItem from "./GroupItem";

/**
 * Gets ordinary for number
 * @param {number} n
 * @returns {string} ordinary
 */
function oddsOrdiany(n) {
  let s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Formats odds in a pretty way :)
 * @param {number} odds
 * @param {number} oddsType
 * @returns {string} formatted odds
 */
function oddsFormat(odds, oddsType) {
  switch (oddsType) {
    case 1:
    case 5:
      return `${oddsOrdiany(odds)} entry wins`;
    case 2:
    case 6:
      return ` 1 in ${odds} chance`;
    case 3:
    case 7:
      return `Every ${oddsOrdiany(odds)} wins`;
    default:
      return ``;
  }
}
const CardBody = props => {
  const {
    category,
    requirement,
    odds,
    oddsType,
    prize,
    winners,
    endDate,
    addedDate
  } = props;
  return (
    <div className={stylesheet["giveawayCard--body"]}>
      <div className={stylesheet["giveawayCard--category"]}>{category}</div>
      <GroupItem
        firstItem={"Req:"}
        firstItemAria={"Requirement"}
        secondItem={requirement}
        className={"groupItem--alternative"}
        isItemBold={true}
      />
      <GroupItem
        firstItem={"Odds:"}
        secondItem={odds === 0 ? "Sweepstakes" : oddsFormat(odds, oddsType)}
        className={"groupItem"}
        highlighted={oddsType === 1 || oddsType === 2 || oddsType === 3}
        isItemBold={true}
      />
      <GroupItem
        firstItem={"Prizes:"}
        secondItem={
          winners === 0 ? `${prize} Total` : `${prize - winners} Left`
        }
        className={"groupItem--alternative"}
        isItemBold={true}
      />
      <GroupItem
        firstItem={"Started"}
        secondItem={"Ends"}
        className={"groupItem"}
        around={true}
        bold={true}
        isItemBold={false}
      />
      <GroupItem
        firstItem={addedDate}
        secondItem={endDate}
        className={"groupItem--alternative"}
        around={true}
      />
    </div>
  );
};
CardBody.propTypes = {
  endDate: string.isRequired,
  addedDate: string.isRequired,
  prize: number.isRequired,
  winners: number.isRequired,
  odds: number.isRequired,
  requirement: string.isRequired,
  category: string,
  oddsType: number.isRequired
};
export default CardBody;
