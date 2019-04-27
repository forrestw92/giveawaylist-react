import React from "react";
import { string, node, bool, func, number } from "prop-types";
import stylesheet from "./index.css";
class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forceHide: false
    };
  }

  _startTimer = () => {
    const { ttl, onDeath } = this.props;
    setTimeout(() => {
      this.setState({ forceHide: true }, () => onDeath());
    }, ttl * 1000);
  };
  componentDidMount() {
    const { show } = this.props;
    if (!show) return;
    this._startTimer();
  }
  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this._startTimer();
    }
  }

  render() {
    const { alertType, children, show } = this.props;
    return (
      <div
        className={`alert ${alertType ? alertType : "primary"} ${
          show && !this.state.forceHide ? "" : "hide"
        }`}
        role="alert"
        aria-atomic="true"
      >
        {children}
        <style jsx>{stylesheet}</style>
      </div>
    );
  }
}

Alert.propTypes = {
  ttl: number,
  alertType: string,
  show: bool.isRequired,
  onDeath: func.isRequired,
  children: node.isRequired
};

export default Alert;
