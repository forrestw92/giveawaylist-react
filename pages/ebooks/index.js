import React from "react";

import { withRouter } from "next/router";
import { object } from "prop-types";

import Head from "../../components/head";
import GiveawayContainer from "../../Containers/GiveawayContainer";
import FilterContainer from "../../Containers/FilterContainer";

class EBooks extends React.Component {
  render() {
    const { router } = this.props;
    return (
      <React.Fragment>
        <Head
          title="eBooks Giveaways - Amazon Giveaway List"
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
}
EBooks.propTypes = {
  router: object.isRequired
};

export default withRouter(EBooks);
