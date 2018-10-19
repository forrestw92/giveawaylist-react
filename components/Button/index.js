import React from "react";
import { string, func } from "prop-types";
import stylesheet from "./index.css";
class Button extends React.Component {
  render() {
    const { className, label, _onClick } = this.props;
    return (
      <button
        className={stylesheet["button"] + " " + stylesheet[className]}
        onClick={e => _onClick(e)}
      >
        {label}
      </button>
    );
  }
}
Button.propTypes = {
  _onClick: func.isRequired,
  label: string.isRequired,
  className: string.isRequired
};

export default Button;
