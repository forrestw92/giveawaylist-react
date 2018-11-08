import React from "react";
import Router from "next/router";
import cookies from "next-cookies";
import { validateAccount } from "../../../API";
import Head from "../../../components/head";
import Header from "../../../components/Header";
import "../../global.css";
import LoginContainer from "../../../Containers/LoginContainer";
class Login extends React.Component {
  static async getInitialProps(ctx) {
    const { giveawayToken } = cookies(ctx);
    if (ctx.res) {
      if (!giveawayToken) {
        return {};
      }

      await validateAccount({ token: giveawayToken })
        .then(res => {
          if (res.data.isvalid) {
            console.log(giveawayToken);
            ctx.res.writeHead(302, {
              Location: "/profile",
              "Content-Type": "text/html; charset=utf-8"
            });
          }
        })
        /** TODO:: Better Error Handling **/
        .catch(err => console.log(err));
      ctx.res.end();
    } else {
      if (!giveawayToken) {
        return {};
      }
      Router.push("/profile");
    }
    return {};
  }
  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Login" />
        <Header />
        <main className={"content"}>
          <LoginContainer />
        </main>
      </React.Fragment>
    );
  }
}

export default Login;
