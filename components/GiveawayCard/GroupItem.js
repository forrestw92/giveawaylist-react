import React from "react";
import stylesheet from "./index.css";
import PropTypes, { string, number, bool } from "prop-types";

const GroupItem = props => {
  return (
    <div
      className={
        props.around
          ? stylesheet[props.className] + " " + stylesheet["around"]
          : stylesheet[props.className]
      }
    >
      <p
        className={
          props.highlighted && props.isItemBold
            ? stylesheet["highlighted"] + " " + stylesheet["item"]
            : props.isItemBold
              ? stylesheet["item"]
              : props.highlighted
                ? stylesheet["highlighted"]
                : undefined
        }
      >
        {props.bold ? <strong>{props.firstItem}</strong> : props.firstItem}
      </p>
      <p className={props.highlighted ? stylesheet["highlighted"] : undefined}>
        {props.bold ? <strong>{props.secondItem}</strong> : props.secondItem}
      </p>
    </div>
  );
};
GroupItem.defaultProps = {
  around: false,
  bold: false,
  highlighted: false,
  isItemBold: false
};
GroupItem.propTypes = {
  firstItem: PropTypes.oneOfType([string, number]).isRequired,
  secondItem: PropTypes.oneOfType([string, number]).isRequired,
  className: string.isRequired,
  around: bool,
  bold: bool,
  highlighted: bool,
  isItemBold: bool
};
export default GroupItem;
