import React from "react";
import { connect } from "react-redux";
import { node } from "prop-types";
class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
Layout.propTypes = {
  children: node.isRequired
};
export default connect(state => state)(Layout);
