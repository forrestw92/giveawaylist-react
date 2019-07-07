import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../../components/head";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";
function EBooks(props) {
  const { router } = props;
  return (
    <React.Fragment>
      <Head
        title="List of all Amazon Kindle eBook Giveaways - Amazon Giveaway List"
        description={
          "All Amazon E-Book Giveaways. Search,Sort And Filter for the best E-Books."
        }
      />
      <div className={"content"}>
        <FilterContainer />
        <GiveawayContainer title={"eBook Giveaways"} router={router} />
      </div>
    </React.Fragment>
  );
}

EBooks.propTypes = {
  router: object.isRequired
};

export default withRouter(EBooks);
