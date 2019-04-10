import React from "react";
import Router from "next/router";
import { userLogout } from "../../../Redux/actions/loginActions";

class Logout extends React.Component {
  static async getInitialProps({ res, store }) {
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
      Router.push("/profile/login");
    }
    return {};
  }
}

export default Logout;
