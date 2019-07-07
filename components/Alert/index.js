import React, { useState, useEffect } from "react";
import { string, node, bool, func, number } from "prop-types";
import stylesheet from "./index.css";
function Alert(props) {
  const { alertType, children, show, transitionTime, onDeath, ttl } = props;
  let [forceHide, setForceHide] = useState(false);

  const _onClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const _startDeathTimer = () => {
    setTimeout(() => {
      onDeath();
    }, transitionTime * 1000);
  };
  const _startTTLTimer = () => {
    setTimeout(() => {
      setForceHide(true);
    }, ttl * 1000);
  };

  useEffect(() => {
    if (forceHide) _startDeathTimer();
    if (show) _startTTLTimer();
  });

  return (
    <div
      onClick={_onClick}
      className={`alert ${alertType ? alertType : "primary"} ${
        show && !forceHide ? "" : "hide"
      }`}
      style={{ transition: `opacity ${transitionTime}s linear` }}
      role="alert"
      aria-atomic="true"
    >
      {children}
      <style jsx>{stylesheet}</style>
    </div>
  );
}

Alert.defaultProps = {
  transitionTime: 0.33,
  ttl: 1.5
};
Alert.propTypes = {
  ttl: number,
  transitionTime: number,
  alertType: string,
  show: bool.isRequired,
  onDeath: func.isRequired,
  children: node.isRequired
};

export default Alert;
