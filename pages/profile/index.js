import React from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
class Profile extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <Navigation currentPage={"profile"} />
        Profile Page
      </section>
    );
  }
}
Profile.propTypes = {};
export default Profile;
