import React from "react";
import Router from "next/router";
import { parseCookies } from "nookies";

import Head from "../../../components/head";
import RegisterContainer from "../../../Containers/RegisterContainer";

import "../../global.css";

class Login extends React.Component {
  static async getInitialProps({ req, res, store }) {
    const ctx = { req };
    const { giveawayToken } = parseCookies(ctx);
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
        <div className={"content"}>
          <RegisterContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
