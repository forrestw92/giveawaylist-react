/*eslint prettier/prettier:0*/
import React from "react";
import PropTypes, { string, number, bool } from "prop-types";
import stylesheet from "./index.css";
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
    <div className={around ? className + " " + "around" : className}>
      <p
        aria-label={firstItemAria || undefined}
        className={
          highlighted && isItemBold
            ? "highlighted" + " " + "item"
            : isItemBold
              ? "item"
              : highlighted
                ? "highlighted"
                : undefined
        }
      >
        {bold ? <strong>{firstItem}</strong> : firstItem}
      </p>
      <p className={highlighted ? "highlighted" : undefined}>
        {bold ? <strong>{secondItem}</strong> : secondItem}
      </p>
      <style jsx>{stylesheet}</style>
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
