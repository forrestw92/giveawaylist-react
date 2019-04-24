import React from "react";
import { string, func } from "prop-types";
import stylesheet from "./index.css";
import Filter from "../../static/icons/filter.svg";
class FAB extends React.Component {
  render() {
    const { ariaLabel, className, _onClick } = this.props;
    return (
      <div
        className={className}
        aria-label={ariaLabel}
        onClick={() => _onClick()}
      >
        <Filter />
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}
FAB.propTypes = {
  _onClick: func.isRequired,
  className: string.isRequired,
  ariaLabel: string.isRequired
};

export default FAB;
