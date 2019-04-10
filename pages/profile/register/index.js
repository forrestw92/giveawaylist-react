import React from "react";
import "../../global.css";
import Head from "../../../components/head";
import Header from "../../../components/Header";
import RegisterContainer from "../../../Containers/RegisterContainer";
import cookies from "next-cookies";
import Router from "next/router";
class Login extends React.Component {
  static async getInitialProps({ req, res, store }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    if (giveawayToken && store.getState().user.loggedIn) {
      if (res) {
        res.clearCookie("giveawayToken");
        res.writeHead(302, {
          Location: "/profile/"
        });
        res.end();
      } else {
        Router.push("/profile/");
      }
    }
    return {};
  }
  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Register" />
        <Header />
        <div className={"content"}>
          <RegisterContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
