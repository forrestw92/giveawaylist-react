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
  _onClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  _startDeathTimer = () => {
    const { onDeath, transitionTime } = this.props;
    setTimeout(() => {
      onDeath();
    }, transitionTime * 1000);
  };
  _startTTLTimer = () => {
    const { ttl } = this.props;
    setTimeout(() => {
      this.setState({ forceHide: true }, () => this._startDeathTimer());
    }, ttl * 1000);
  };
  componentDidMount() {
    const { show } = this.props;
    if (!show) return;
    this._startTTLTimer();
  }
  componentDidUpdate(prevProps) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      this._startTTLTimer();
    }
  }

  render() {
    const { alertType, children, show, transitionTime } = this.props;
    return (
      <div
        onClick={this._onClick}
        className={`alert ${alertType ? alertType : "primary"} ${
          show && !this.state.forceHide ? "" : "hide"
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
