import React from "react";
import stylesheet from "./index.css";
import PropTypes, { string, number } from "prop-types";

const GroupItem = props => {
  return (
    <div className={stylesheet[props.className]}>
      <p>{props.firstItem}</p>
      <p>{props.secondItem}</p>
    </div>
  );
};
GroupItem.propTypes = {
  firstItem: PropTypes.oneOfType([string, number]).isRequired,
  secondItem: PropTypes.oneOfType([string, number]).isRequired,
  className: string.isRequired
};
export default GroupItem;
