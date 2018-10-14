import React from "react";
import stylesheet from "./index.css";
import PropTypes, { string, number, boolean } from "prop-types";

const GroupItem = props => {
  return (
    <div
      className={
        props.around
          ? stylesheet[props.className] + " " + stylesheet["around"]
          : stylesheet[props.className]
      }
    >
      <p className={props.highlighted ? stylesheet["highlighted"] : undefined}>
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
  highlighted: false
};
GroupItem.propTypes = {
  firstItem: PropTypes.oneOfType([string, number]).isRequired,
  secondItem: PropTypes.oneOfType([string, number]).isRequired,
  className: string.isRequired,
  around: boolean,
  bold: boolean,
  highlighted: boolean
};
export default GroupItem;
