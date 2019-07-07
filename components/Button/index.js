import React from "react";
import { string, func } from "prop-types";
import stylesheet from "./index.css";
function Button(props) {
  const { className, label, _onClick, type, href } = props;
  return (
    <React.Fragment>
      {type === "button" ? (
        <button className={`button ${className}`} onClick={e => _onClick(e)}>
          {label}
        </button>
      ) : (
        <a href={href} className={`button ${className}`}>
          {label}
        </a>
      )}
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}

Button.propTypes = {
  _onClick: func.isRequired,
  label: string.isRequired,
  className: string.isRequired,
  type: string.isRequired,
  href: string
};

export default Button;
