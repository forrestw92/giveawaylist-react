import React from "react";
import Router from "next/router";
import { userLogout } from "../../../Redux/actions/loginActions";

class Profile extends React.Component {
  static async getInitialProps({ res, store }) {
    store.dispatch(userLogout());
    if (res) {
      res.clearCookie("giveawayToken");
      return {};
    } else {
      Router.push("/profile/login");
      return {};
    }
  }
}

export default Profile;
