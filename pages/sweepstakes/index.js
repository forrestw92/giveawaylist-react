import React from "react";
import Head from "../../components/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
const Home = () => (
  <div>
    <Head title="Sweepstakes - Amazon Giveaway List" />
    <Header />
    <Navigation currentPage={"sweepstakes"} />
  </div>
);

export default Home;
