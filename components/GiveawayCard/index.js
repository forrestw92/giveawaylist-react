import React from "react";
import { string, number } from "prop-types";
import ClampLines from "react-clamp-lines";
import moment from "moment-timezone";

import LazyLoad from "react-lazyload";
import stylesheet from "./index.css";
import CardImage from "./CardImage";
import GroupItem from "./GroupItem";
import CardHeader from "./CardHeader";
class GiveawayCard extends React.Component {
  render() {
    const {
      picture,
      name,
      requirement,
      odds,
      giveaway,
      addedDate,
      endDate,
      prize,
      item,
      category,
      winners,
      enteredCount,
      oddsType
    } = this.props;
    return (
      <div className={stylesheet.giveawayCard}>
        <CardHeader name={name} picture={picture} />
        <div className={stylesheet["giveawayCard--body"]}>
          <div className={stylesheet["giveawayCard--category"]}>{category}</div>
          <GroupItem
            firstItem={"Req:"}
            secondItem={requirement}
            className={"groupItem--alternative"}
          />
          <GroupItem
            firstItem={"Odds"}
            secondItem={odds}
            className={"groupItem"}
            highlighted={odds < 1000}
          />
          <GroupItem
            firstItem={"Prizes:"}
            secondItem={`${prize - winners} Left`}
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
            firstItem={moment(addedDate + " PDT")
              .tz("America/Los_Angeles")
              .fromNow()}
            secondItem={moment(endDate + " PDT")
              .tz("America/Los_Angeles")
              .fromNow()}
            className={"groupItem--alternative"}
            around={true}
          />
        </div>
        <div className={stylesheet["giveawayCard--footer"]}>
          <img
            src={"../../static/icons/heart.svg"}
            alt={"Save Giveaway"}
            className={stylesheet["save--giveaway"]}
          />
          <div className={stylesheet["views--giveaway"]}>
            <img src={"../../static/icons/eye.svg"} alt={"View Count"} />
            <span className={stylesheet.count}>{enteredCount}</span>
          </div>
          <img
            src={"../../static/icons/play.svg"}
            alt={"Enter Giveaway"}
            className={stylesheet["enter--giveaway"]}
          />
        </div>
      </div>
    );
  }
}

GiveawayCard.propTypes = {
  picture: string,
  name: string,
  requirement: string,
  odds: number,
  giveaway: string,
  isKindle: number,
  addedDate: string,
  endDate: string,
  prize: number,
  item: string,
  category: string,
  winners: number,
  enteredCount: number,
  oddsType: number
};
export default GiveawayCard;
