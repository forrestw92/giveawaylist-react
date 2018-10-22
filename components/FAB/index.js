import React from "react";
import { string, func } from "prop-types";
import stylesheet from "./index.css";

class FAB extends React.Component {
  render() {
    const { ariaLabel, image, className, _onClick } = this.props;
    return (
      <div
        className={stylesheet[className]}
        aria-label={ariaLabel}
        onClick={() => _onClick}
      >
        <img src={image} alt={ariaLabel} />
      </div>
    );
  }
}
FAB.propTypes = {
  _onClick: func.isRequired,
  className: string.isRequired,
  image: string.isRequired,
  ariaLabel: string.isRequired
};

export default FAB;
