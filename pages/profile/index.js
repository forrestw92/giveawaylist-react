import React from "react";
import Router from "next/router";
import Header from "../../components/Header";
import { userLogin, userLogout } from "../../Redux/actions/loginActions";
import Head from "../../components/head";
import { setBearer, validateAccount } from "../../API";
import cookies from "next-cookies";

class Profile extends React.Component {
  static async getInitialProps({ req, res, store }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    setBearer(giveawayToken || "");
    if (giveawayToken && store.getState().user.loggedIn) {
      await validateAccount({ token: giveawayToken })
        .then(result => {
          if (result.data.isvalid) {
            const user = { ...result.data, token: giveawayToken };
            store.dispatch(userLogin(user));
          }
        })
        .catch(({ response }) => {
          if (!response.data.isvalid) {
            store.dispatch(userLogout());
            if (res) {
              res.clearCookie("giveawayToken");
              res.writeHead(302, {
                Location: "/profile/login"
              });
              res.end();
            } else {
              document.cookie =
                "giveawayToken=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
              Router.push("/profile/logout");
            }
          }
        });
    } else {
      if (res) {
        res.writeHead(302, {
          Location: "/profile/login"
        });
        res.end();
      } else {
        Router.push("/profile/login");
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
        Profile Page
      </React.Fragment>
    );
  }
}

export default Profile;
