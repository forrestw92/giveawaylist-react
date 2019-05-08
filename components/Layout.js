import React from "react";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { node, func, object } from "prop-types";
import { setPageId } from "../Redux/actions/navActions";
import { parseCookies } from "nookies";

import { setBearer } from "../API";
class Layout extends React.Component {
  componentDidMount() {
    const { giveawayToken } = parseCookies();
    setBearer(giveawayToken);
    const handleRouteChange = url => {
      const pageId = url.includes("?pageId")
        ? parseInt(url.replace(/^\D+/g, "")) || 1
        : 1;
      this.props.setPageId(pageId);
    };

    Router.events.on("routeChangeStart", handleRouteChange);
  }

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
Layout.propTypes = {
  children: node.isRequired,
  setPageId: func.isRequired,
  router: object.isRequired
};
export default withRouter(
  connect(
    state => state,
    { setPageId }
  )(Layout)
);
