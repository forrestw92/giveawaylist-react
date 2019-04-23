import React from "react";

import { withRouter } from "next/router";
import { func, object } from "prop-types";

import Head from "../components/head";
import GiveawayContainer from "../Containers/GiveawayContainer";
import FilterContainer from "../Containers/FilterContainer";

import stylesheet from "./global.css";
import "./global.css";

class Home extends React.PureComponent {
  render() {
    const { router } = this.props;
    return (
      <React.Fragment>
        <Head title="Home - Amazon Giveaway List" />
        <div className={stylesheet["content"]}>
          <FilterContainer />
          <GiveawayContainer title={"All Giveaways"} router={router} />
        </div>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  fetchGiveaways: func.isRequired,
  router: object.isRequired
};

export default withRouter(Home);
