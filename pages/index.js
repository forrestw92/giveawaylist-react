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
class Home extends React.Component {
  static getInitialProps({ query }) {
    return { pageId: parseInt(query.pageId) || 1 };
  }
  componentDidMount() {
    this.props.fetchGiveaways(this.props.pageId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageId !== this.props.pageId) {
      this.props.fetchGiveaways(this.props.pageId);
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
        <Head title="Amazon Giveaway List - Home" />
        <Header />
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
