import React from "react";
import { connect } from "react-redux";
import { object, func, number } from "prop-types";
import {
  fetchGiveaways,
  deleteSingleGiveaway,
  deleteGiveaways
} from "../Redux/actions/giveawayActions";

import Head from "../components/head";
import Header from "../components/Header";
import GiveawayContainer from "../Containers/GiveawayContainer";
import "./global.css";
import Pageination from "../components/Pageination/Pageination";
class Home extends React.Component {
  static getInitialProps({ query }) {
    return { pageId: parseInt(query.pageId) || 1 };
  }
  componentDidMount() {
    this.props.fetchGiveaways(this.props.pageId);
  }
  componentDidUpdate(nextProps) {
    if (this.props.pageId !== nextProps.pageId) {
      this.props.fetchGiveaways(nextProps.pageId);
    }
  }
  render() {
    const {
      giveaways,
      deleteSingleGiveaway,
      deleteGiveaways,
      pageId
    } = this.props;
    const { items, totalGiveaways } = giveaways;
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Home" />
        <Header />
        <main className={"content"}>
          <GiveawayContainer
            giveaways={items}
            deleteSingleGiveaway={deleteSingleGiveaway}
          />
          <Pageination
            totalPages={totalGiveaways / 24}
            currentlySelected={pageId}
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
  pageId: number
};
Home.defaultProps = {
  giveaways: {},
  pageId: 1
};

export default connect(
  state => state,
  { fetchGiveaways, deleteSingleGiveaway, deleteGiveaways }
)(Home);
