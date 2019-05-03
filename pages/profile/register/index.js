import React from "react";
import Router from "next/router";
import { parseCookies } from "nookies";

import Head from "../../../components/head";
import RegisterContainer from "../../../Containers/RegisterContainer";

import stylesheet from "./index.css";
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
        <Head title="Register - Amazon Giveaway List" />
        <div className={"content"}>
          <RegisterContainer />
        </div>
        <style jsx>{stylesheet}</style>
      </React.Fragment>
    );
  }
}

export default Login;
