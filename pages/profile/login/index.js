import React from "react";
import Router from "next/router";
import cookies from "next-cookies";
import { validateAccount } from "../../../API";
import Head from "../../../components/head";
import Header from "../../../components/Header";
import "../../global.css";
import LoginContainer from "../../../Containers/LoginContainer";
import { userLogout } from "../../../Redux/actions/loginActions";
class Login extends React.Component {
  static async getInitialProps({ req, res, store }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    if (res) {
      if (!giveawayToken) {
        return {};
      }

      await validateAccount({ token: giveawayToken })
        .then(result => {
          if (result.data.isvalid) {
            console.log(giveawayToken);
            res.writeHead(302, {
              Location: "/profile",
              "Content-Type": "text/html; charset=utf-8"
            });
          }
        })
        .catch(({ response }) => {
          if (!response.data.isvalid) {
            store.dispatch(userLogout());
          }
        });
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
        <div className={"content"}>
          <LoginContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
