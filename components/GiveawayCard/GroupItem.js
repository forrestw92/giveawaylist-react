/*eslint prettier/prettier:0*/
import React from "react";
import stylesheet from "./index.css";
import PropTypes, { string, number, bool } from "prop-types";

const GroupItem = props => {
  const {
    firstItem,
    firstItemAria,
    secondItem,
    className,
    around,
    bold,
    highlighted,
    isItemBold
  } = props;
  return (
    <div
      className={
        around
          ? stylesheet[className] + " " + stylesheet["around"]
          : stylesheet[className]
      }
    >
      <p
        aria-label={firstItemAria || undefined}
        className={
          highlighted && isItemBold
            ? stylesheet["highlighted"] + " " + stylesheet["item"]
            : isItemBold
              ? stylesheet["item"]
              : highlighted
                ? stylesheet["highlighted"]
                : undefined
        }
      >
        {bold ? <strong>{firstItem}</strong> : firstItem}
      </p>
      <p className={highlighted ? stylesheet["highlighted"] : undefined}>
        {bold ? <strong>{secondItem}</strong> : secondItem}
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
  firstItemAria: string,
  secondItem: PropTypes.oneOfType([string, number]).isRequired,
  className: string.isRequired,
  around: bool,
  bold: bool,
  highlighted: bool,
  isItemBold: bool
};
export default GroupItem;
