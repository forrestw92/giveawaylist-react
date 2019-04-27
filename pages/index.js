import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../components/head";
import GiveawayContainer from "../Containers/GiveawayContainer";
import FilterContainer from "../Containers/FilterContainer";

class Home extends React.PureComponent {
  render() {
    const { router } = this.props;
    return (
      <React.Fragment>
        <Head title="Home - Amazon Giveaway List" />
        <div className={"content"}>
          <FilterContainer />
          <GiveawayContainer title={"All Giveaways"} router={router} />
        </div>
      </React.Fragment>
    );
  }
}
Home.propTypes = {
  router: object.isRequired
};

export default withRouter(Home);
