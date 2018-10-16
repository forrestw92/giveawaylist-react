import React from "react";
import { connect } from "react-redux";
import { object, func, number } from "prop-types";
import axios from "axios";
import {
  fetchGiveaways,
  deleteGiveaway
} from "../Redux/actions/giveawayActions";

import Head from "../components/head";
import Header from "../components/Header";
import GiveawayContainer from "../Containers/GiveawayContainer";
import "./global.css";
class Home extends React.Component {
  static getInitialProps({ query }) {
    return { pageId: parseInt(query.pageId) || 1 };
  }
  componentDidMount() {
    this.props.fetchGiveaways(this.props.pageId);
  }
  render() {
    const { items } = this.props.giveaways;
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Home" />
        <Header />
        <main className={"content"} />
        <GiveawayContainer
          giveaways={items}
          deleteGiveaway={this.props.deleteGiveaway}
        />
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  giveaways: object,
  fetchGiveaways: func.isRequired,
  deleteGiveaway: func.isRequired,
  pageId: number
};
Home.defaultProps = {
  giveaways: {},
  pageId: 1
};

export default connect(
  state => state,
  { fetchGiveaways, deleteGiveaway }
)(Home);
