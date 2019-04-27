import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { node, func, object } from "prop-types";
import { setPageId } from "../Redux/actions/navActions";
import { parseCookies } from "nookies";
import { setBearer } from "../API";
class Layout extends React.Component {
  componentDidMount() {
    const { giveawayToken } = parseCookies();
    setBearer(giveawayToken);
  }
  componentDidUpdate(prevProps) {
    const { query, pathname } = this.props.router;
    if (
      query.pageId !== prevProps.router.query.pageId ||
      pathname !== prevProps.router.pathname
    ) {
      this.props.setPageId(parseInt(query.pageId) || 1);
    }
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
