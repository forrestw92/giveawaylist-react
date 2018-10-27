import React from "react";

import Head from "../../../components/head";
import Header from "../../../components/Header";
import "../../global.css";
import LoginContainer from "../../../Containers/LoginContainer";
import Navigation from "../../../components/Navigation";
class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Login" />
        <Header />
        <Navigation currentPage={"login"} />
        <main className={"content"}>
          <LoginContainer />
        </main>
      </React.Fragment>
    );
  }
}

export default Login;
