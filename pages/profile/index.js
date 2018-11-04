import React from "react";
import Router from "next/router";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { userLogin } from "../../Redux/actions/loginActions";
import Head from "../../components/head";
import { validateAccount } from "../../API";
import cookies from "next-cookies";

class Profile extends React.Component {
  static async getInitialProps({ req, res, store }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    if (res) {
      if (!giveawayToken) {
        res.writeHead(302, {
          Location: "/profile/login",
          "Content-Type": "text/html; charset=utf-8"
        });
        res.end();
        return {};
      } else {
        await validateAccount({ token: giveawayToken })
          .then(result => {
            console.log(result.data);
            if (result.data.isvalid) {
              store.dispatch(userLogin(result.data));
            }
          })
          /** TODO:: Better Error Handling **/
          .catch(err => console.log(err));
      }
    } else {
      if (!giveawayToken) {
        Router.push("/profile/login");
        return {};
      }
    }
    return {};
  }
  async componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Profile" />
        <Header />
        <Navigation currentPage={"/profile"} />
        Profile Page
      </React.Fragment>
    );
  }
}

export default Profile;
