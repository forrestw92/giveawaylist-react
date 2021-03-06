import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../../components/head";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";
function Ending(props) {
  const { router } = props;
  return (
    <React.Fragment>
      <Head
        title="Updated daily list of ending Amazon Giveaways - Amazon Giveaway List"
        description={"Enter all the ending Amazon Giveaways before midnight."}
      />
      <div className={"content"}>
        <FilterContainer />
        <GiveawayContainer title="Ending Giveaways" router={router} />
      </div>
    </React.Fragment>
  );
}
Ending.propTypes = {
  router: object.isRequired
};

export default withRouter(Ending);
