import React from "react";
import Head from "../../components/head";
import Header from "../../components/Header";
import { connect } from "react-redux";
import {
  deleteGiveaways,
  deleteSingleGiveaway,
  fetchGiveaways
} from "../../Redux/actions/giveawayActions";
import { showHideFAB, stickyFAB } from "../../Redux/actions/menuActions";
import stylesheet from "../global.css";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import Pagination from "../../components/Pagination";
import { func, number, object } from "prop-types";
import cookies from "next-cookies";
import { validateAccount } from "../../API";
import { userLogin, userLogout } from "../../Redux/actions/loginActions";
import FilterContainer from "../../Containers/FilterContainer";

class Ending extends React.Component {
  static async getInitialProps({ query, req, store, isServer }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    await store.dispatch(deleteGiveaways());
    if (isServer) {
      await store.dispatch(
        fetchGiveaways(parseInt(query.pageId) || 1, "ending")
      );
    }
    if (giveawayToken && !store.getState().user.loggedIn) {
      await validateAccount({ token: giveawayToken })
        .then(result => {
          console.log(result.data);
          if (result.data.isvalid) {
            store.dispatch(userLogin(result.data));
          }
        })
        .catch(({ response }) => {
          if (!response.data.isvalid) {
            store.dispatch(userLogout());
          }
        });
    }
    return { pageId: parseInt(query.pageId) || 1 };
  }
  componentDidMount() {
    if (this.props.giveaways.items.length === 0) {
      this.props.deleteGiveaways();
      this.props.fetchGiveaways(this.props.pageId, "ending");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageId !== this.props.pageId) {
      this.props.deleteGiveaways();
      this.props.fetchGiveaways(this.props.pageId, "ending");
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
        <Head title="Ending Giveaways - Amazon Giveaway List" />
        <Header />
        <div className={stylesheet["content"]}>
          <FilterContainer showHideFAB={showHideFAB} isFABOpen={fabOpen} />
          <GiveawayContainer
            title="Ending Giveaways"
            giveaways={items}
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
Ending.propTypes = {
  giveaways: object,
  fetchGiveaways: func.isRequired,
  deleteSingleGiveaway: func.isRequired,
  deleteGiveaways: func.isRequired,
  pageId: number,
  showHideFAB: func.isRequired,
  menus: object.isRequired
};
Ending.defaultProps = {
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
)(Ending);
