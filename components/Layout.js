import React from "react";
import { connect } from "react-redux";
import { object } from "prop-types";
class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
Layout.propTypes = {
  children: object.isRequired
};
export default connect(state => state)(Layout);
