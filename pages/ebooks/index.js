import React from "react";
import Head from "../../components/head";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";

const Home = () => (
  <div>
    <Head title="Book Giveaways - Amazon Giveaway List" />
    <Header />
    <Navigation currentPage={"/ebooks"} />
  </div>
);

export default Home;
