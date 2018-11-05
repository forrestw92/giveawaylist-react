import React from "react";
import { string, number } from "prop-types";
import moment from "moment-timezone";
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

const now = moment.tz("America/Los_Angeles");

/**
 * Checks if now is DST and adds hour if not
 * @param {string} time
 * @returns {string} time diff
 */
function dstCheck(time) {
  if (!now.isDST()) {
    return moment(time)
      .tz("America/Los_Angeles")
      .add(1, "hours")
      .fromNow();
  } else {
    return moment(time)
      .tz("America/Los_Angeles")
      .fromNow();
  }
}
const CardBody = props => {
  return (
    <div className={stylesheet["giveawayCard--body"]}>
      <div className={stylesheet["giveawayCard--category"]}>
        {props.category}
      </div>
      <GroupItem
        firstItem={"Req:"}
        secondItem={props.requirement}
        className={"groupItem--alternative"}
        isItemBold={true}
      />
      <GroupItem
        firstItem={"Odds:"}
        secondItem={
          props.odds === 0
            ? "Sweepstakes"
            : (props.oddsType === 1 ? "Every " : "1 in ") +
              oddsOrdiany(props.odds)
        }
        className={"groupItem"}
        highlighted={props.odds < 1000}
        isItemBold={true}
      />
      <GroupItem
        firstItem={"Prizes:"}
        secondItem={`${props.prize - props.winners} Left`}
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
        firstItem={dstCheck(props.addedDate)}
        secondItem={dstCheck(props.endDate)}
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
