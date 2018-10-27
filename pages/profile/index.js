import React from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Head from "../../components/head";
class Profile extends React.Component {
  render() {
    return (
      <div>
        <Head title="Amazon Giveaway List - Profile" />
        <Header />
        <Navigation currentPage={"/profile"} />
        Profile Page
      </div>
    );
  }
}
Profile.propTypes = {};
export default Profile;
