import React, { useEffect } from "react";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { node, func, object } from "prop-types";
import { setPageId } from "../Redux/actions/navActions";
import {
  deleteGiveaways,
  fetchGiveaways
} from "../Redux/actions/giveawayActions";
import { parseCookies } from "nookies";

import { setBearer } from "../API";
function Layout(props) {
  const { children, setPageId, deleteGiveaways, fetchGiveaways } = props;
  useEffect(() => {
    const { giveawayToken } = parseCookies();
    setBearer(giveawayToken);
    const handleRouteChange = url => {
      const pageId = url.includes("?pageId")
        ? parseInt(url.replace(/^\D+/g, "")) || 1
        : 1;
      setPageId(pageId);
      deleteGiveaways();
      fetchGiveaways();
    };

    Router.events.on("routeChangeStart", handleRouteChange);
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
}

Layout.propTypes = {
  children: node.isRequired,
  setPageId: func.isRequired,
  router: object.isRequired,
  deleteGiveaways: func.isRequired,
  fetchGiveaways: func.isRequired
};
export default withRouter(
  connect(
    state => state,
    { setPageId, deleteGiveaways, fetchGiveaways }
  )(Layout)
);
