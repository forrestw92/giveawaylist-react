import React from "react";

import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { func, object } from "prop-types";
import cookies from "next-cookies";

import Head from "../../components/head";
import Header from "../../components/Header";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";

import stylesheet from "../global.css";
import "../global.css";

import { userLogin, userLogout } from "../../Redux/actions/loginActions";
import { setBearer, validateAccount } from "../../API";
import {
  deleteGiveaways,
  fetchGiveaways
} from "../../Redux/actions/giveawayActions";

class EBooks extends React.Component {
  static async getInitialProps({ req, res, store, isServer }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);

    if (isServer) {
      await store.dispatch(fetchGiveaways());
    } else {
      await store.dispatch(deleteGiveaways());
    }
    setBearer(giveawayToken || "");

    if (giveawayToken && !store.getState().user.loggedIn) {
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
        <Head title="eBooks Giveaways - Amazon Giveaway List" />
        <Header />

        <div className={stylesheet["content"]}>
          <FilterContainer />
          <GiveawayContainer title={"eBook Giveaways"} router={router} />
        </div>
      </React.Fragment>
    );
  }
}
EBooks.propTypes = {
  fetchGiveaways: func.isRequired,
  router: object.isRequired
};
EBooks.defaultProps = {
  giveaways: {}
};

export default withRouter(
  connect(
    null,
    {
      fetchGiveaways
    }
  )(EBooks)
);
