import React from "react";
import { string, func } from "prop-types";
import stylesheet from "./index.css";
class Button extends React.Component {
  render() {
    const { className, label, _onClick, type, href } = this.props;
    return (
      <React.Fragment>
        {type === "button" ? (
          <button
            className={stylesheet["button"] + " " + stylesheet[className]}
            onClick={e => _onClick(e)}
          >
            {label}
          </button>
        ) : (
          <a
            href={href}
            className={stylesheet["button"] + " " + stylesheet[className]}
          >
            {label}
          </a>
        )}
      </React.Fragment>
    );
  }
}
Button.propTypes = {
  _onClick: func.isRequired,
  label: string.isRequired,
  className: string.isRequired,
  type: string.isRequired,
  href: string
};

export default Button;
