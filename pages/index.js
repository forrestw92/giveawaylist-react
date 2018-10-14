import React from "react";
import { withRouter } from "next/router";
import { array } from "prop-types";
import axios from "axios";
import Head from "../components/head";
import Header from "../components/Header";
import GiveawayContainer from "../Containers/GiveawayContainer";
import "./global.css";
class Home extends React.Component {
  static async getInitialProps({ query }) {
    const pageId = query.pageId || 1;

    const giveaways = await axios
      .post(`https://forrestwalker.me/api/o1/giveaway/${pageId}`)
      .then(res => res.data.results)
      .then(res => res)
      .catch(err => {
        const { status, statusText } = err.response;
        return { error: { status, statusText } };
      });
    return { giveaways };
  }

  render() {
    const { giveaways } = this.props;
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Home" />
        <Header />
        <main className={"content"}>
          <GiveawayContainer giveaways={giveaways} />
        </main>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  giveaways: array
};
Home.defaultProps = {
  giveaways: []
};
export default Home;
