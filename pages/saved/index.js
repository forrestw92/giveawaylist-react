import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../../components/head";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";

import stylesheet from "../global.css";
import "../global.css";

class Saved extends React.Component {
  render() {
    const { router } = this.props;
    return (
      <React.Fragment>
        <Head title="Saved Giveaways - Amazon Giveaway List" />

        <div className={stylesheet["content"]}>
          <FilterContainer />
          <GiveawayContainer title={"Saved Giveaways"} router={router} />
        </div>
      </React.Fragment>
    );
  }
}
Saved.propTypes = {
  router: object.isRequired
};

export default withRouter(Saved);
