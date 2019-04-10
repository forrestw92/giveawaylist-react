import React from "react";
import { connect } from "react-redux";

import { object, func, number } from "prop-types";
import {
  fetchGiveaways,
  deleteSingleGiveaway,
  deleteGiveaways
} from "../Redux/actions/giveawayActions";
import { showHideFAB, stickyFAB } from "../Redux/actions/menuActions";
import Head from "../components/head";
import Header from "../components/Header";
import GiveawayContainer from "../Containers/GiveawayContainer";
import "./global.css";
import stylesheet from "./global.css";
import Pagination from "../components/Pagination/";
import cookies from "next-cookies";
import { userLogin, userLogout } from "../Redux/actions/loginActions";
import { validateAccount } from "../API";
import FilterContainer from "../Containers/FilterContainer";
import Router from "next/router";

class Home extends React.Component {
  static async getInitialProps({ query, req, res, store, isServer }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    await store.dispatch(deleteGiveaways());
    if (isServer) {
      await store.dispatch(fetchGiveaways(parseInt(query.pageId) || 1));
    }
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
    return { pageId: parseInt(query.pageId) || 1 };
  }
  componentDidMount() {
    if (this.props.giveaways.items.length === 0) {
      this.props.deleteGiveaways();
      this.props.fetchGiveaways(this.props.pageId);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.pageId !== this.props.pageId) {
      this.props.deleteGiveaways();
      this.props.fetchGiveaways(this.props.pageId);
    }
  }
  render() {
    const {
      giveaways,
      deleteSingleGiveaway,
      deleteGiveaways,
      pageId,
      menus,
      showHideFAB
    } = this.props;
    const { fabOpen, fabSticky } = menus;
    const { items, totalGiveaways } = giveaways;
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Home" />
        <Header />

        <div className={stylesheet["content"]}>
          <FilterContainer showHideFAB={showHideFAB} isFABOpen={fabOpen} />
          <GiveawayContainer
            giveaways={items}
            title={"All Giveaways"}
            deleteSingleGiveaway={deleteSingleGiveaway}
          />
          <Pagination
            totalPages={totalGiveaways / 24}
            currentlySelected={pageId}
            fabSticky={fabSticky}
            deleteGiveaways={deleteGiveaways}
          />
        </div>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  giveaways: object,
  fetchGiveaways: func.isRequired,
  deleteSingleGiveaway: func.isRequired,
  deleteGiveaways: func.isRequired,
  pageId: number,
  showHideFAB: func.isRequired,
  menus: object.isRequired
};
Home.defaultProps = {
  giveaways: {},
  pageId: 1
};

export default connect(
  state => state,
  {
    fetchGiveaways,
    deleteSingleGiveaway,
    deleteGiveaways,
    showHideFAB,
    stickyFAB
  }
)(Home);
