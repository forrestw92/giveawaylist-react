import React from "react";

import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { object, func } from "prop-types";
import cookies from "next-cookies";

import Head from "../../components/head";
import Header from "../../components/Header";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";

import stylesheet from "../global.css";
import "../global.css";

import { userLogin, userLogout } from "../../Redux/actions/loginActions";
import { setBearer, validateAccount } from "../../API";
import { fetchGiveaways } from "../../Redux/actions/giveawayActions";

class Saved extends React.Component {
  static async getInitialProps({ query, req, res, store, isServer }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    if (isServer) {
      await store.dispatch(
        fetchGiveaways(parseInt(query.pageId) || 1, "/saved")
      );
    }
    setBearer(giveawayToken || "");

    if (giveawayToken) {
      await validateAccount({ token: giveawayToken })
        .then(result => {
          if (result.data.isvalid) {
            const user = { ...result.data, token: giveawayToken };
            store.dispatch(userLogin(user));
          }
        })
        .catch(({ response }) => {
          if (!response.data.isvalid) {
            store.dispatch(userLogout());
            if (res) {
              res.clearCookie("giveawayToken");
              res.writeHead(302, {
                Location: "/profile/login"
              });
              res.end();
            } else {
              document.cookie =
                "giveawayToken=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
              Router.push("/profile/login");
            }
          }
        });
    }
    return {};
  }
  render() {
    const { router } = this.props;
    return (
      <React.Fragment>
        <Head title="Saved Giveaways - Amazon Giveaway List" />
        <Header />

        <div className={stylesheet["content"]}>
          <FilterContainer />
          <GiveawayContainer title={"Saved Giveaways"} router={router} />
        </div>
      </React.Fragment>
    );
  }
}
Saved.propTypes = {
  fetchGiveaways: func.isRequired,
  router: object.isRequired
};

export default withRouter(
  connect(
    null,
    {
      fetchGiveaways
    }
  )(Saved)
);
