import React from "react";
import Head from "../../components/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
const Home = () => (
  <div>
    <Head title="Saved Giveaways - Amazon Giveaway List" />
    <Header />
    <Navigation currentPage={"saved"} />
  </div>
);

export default Home;
