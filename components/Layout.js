import React from "react";
import { connect } from "react-redux";
import { object } from "prop-types";
const Layout = ({ children }) => <React.Fragment>{children}</React.Fragment>;
Layout.propTypes = {
  children: object.isRequired
};
export default connect(state => state)(Layout);
