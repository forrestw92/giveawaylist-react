import React from "react";
import Head from "../../components/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
class Saved extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head title="Saved Giveaways - Amazon Giveaway List" />
        <Header />
        <Navigation currentPage={"/saved"} />
      </React.Fragment>
    );
  }
}

export default Saved;
