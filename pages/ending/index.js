import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../../components/head";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";

import stylesheet from "../global.css";
import "../global.css";

class Ending extends React.Component {
  render() {
    const { router } = this.props;
    return (
      <React.Fragment>
        <Head title="Ending Giveaways - Amazon Giveaway List" />
        <div className={stylesheet["content"]}>
          <FilterContainer />
          <GiveawayContainer title="Ending Giveaways" router={router} />
        </div>
      </React.Fragment>
    );
  }
}
Ending.propTypes = {
  router: object.isRequired
};

export default withRouter(Ending);
