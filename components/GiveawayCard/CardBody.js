import React from "react";
import PropTypes, { string, number } from "prop-types";
import moment from "moment-timezone";
import stylesheet from "./index.css";
import GroupItem from "./GroupItem";
function oddsOrdiany(n) {
  let s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
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
      />
      <GroupItem
        firstItem={"Odds"}
        secondItem={
          (props.oddsType === 1 ? "Every " : "1 in ") + oddsOrdiany(props.odds)
        }
        className={"groupItem"}
        highlighted={props.odds < 1000}
      />
      <GroupItem
        firstItem={"Prizes:"}
        secondItem={`${props.prize - props.winners} Left`}
        className={"groupItem--alternative"}
      />
      <GroupItem
        firstItem={"Start"}
        secondItem={"Ends"}
        className={"groupItem"}
        around={true}
        bold={true}
      />
      <GroupItem
        firstItem={moment(props.addedDate + " PDT")
          .tz("America/Los_Angeles")
          .fromNow()}
        secondItem={moment(props.endDate + " PDT")
          .tz("America/Los_Angeles")
          .fromNow()}
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
  category: string.isRequired,
  oddsType: number.isRequired
};
export default CardBody;
