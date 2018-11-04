import React from "react";
import Head from "../../components/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
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
import { userLogin } from "../../Redux/actions/loginActions";

class Ending extends React.Component {
  static async getInitialProps({ query, req, store }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    if (giveawayToken) {
      await validateAccount({ token: giveawayToken })
        .then(result => {
          console.log(result.data);
          if (result.data.isvalid) {
            store.dispatch(userLogin(result.data));
          }
        })
        /** TODO:: Better Error Handling **/
        .catch(err => console.log(err));
    }
    return { pageId: parseInt(query.pageId) || 1 };
  }
  componentDidMount() {
    this.props.deleteGiveaways();
    this.props.fetchGiveaways(this.props.pageId, "ending");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageId !== this.props.pageId) {
      this.props.fetchGiveaways(this.props.pageId, "ending");
    }
  }
  render() {
    const {
      giveaways,
      deleteSingleGiveaway,
      deleteGiveaways,
      pageId,
      menus
    } = this.props;
    const { fabOpen, fabSticky } = menus;
    const { items, totalGiveaways } = giveaways;
    return (
      <React.Fragment>
        <Head title="Ending Giveaways - Amazon Giveaway List" />
        <Header />
        <Navigation currentPage={"/ending"} />
        <main className={stylesheet["content"]}>
          <GiveawayContainer
            giveaways={items}
            isFABOpen={fabOpen}
            deleteSingleGiveaway={deleteSingleGiveaway}
            showHideFAB={this.props.showHideFAB}
          />
          <Pagination
            totalPages={totalGiveaways / 24}
            currentlySelected={pageId}
            fabSticky={fabSticky}
            deleteGiveaways={deleteGiveaways}
          />
        </main>
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
