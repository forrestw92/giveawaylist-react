import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../../components/head";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";

function Saved(props) {
  const { router } = props;
  return (
    <React.Fragment>
      <Head title="Saved Giveaways - Amazon Giveaway List" />
      <div className={"content"}>
        <FilterContainer />
        <GiveawayContainer title={"Saved Giveaways"} router={router} />
      </div>
    </React.Fragment>
  );
}
Saved.propTypes = {
  router: object.isRequired
};

export default withRouter(Saved);
