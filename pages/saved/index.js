import React from "react";
import Head from "../../components/head";
import Nav from "../../components/nav";

const Home = () => (
  <div>
    <Head title="Saved Giveaways - Amazon Giveaway List" />
    <Nav />

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
    `}</style>
  </div>
);

export default Home;
