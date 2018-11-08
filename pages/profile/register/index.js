import React from "react";
import Head from "../../../components/head";
import Header from "../../../components/Header";
import "../../global.css";
import RegisterContainer from "../../../Containers/RegisterContainer";
class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Register" />
        <Header />
        <main className={"content"}>
          <RegisterContainer />
        </main>
      </React.Fragment>
    );
  }
}

export default Login;
