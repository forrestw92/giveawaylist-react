import React from "react";
import LoginContainer from "../../../Containers/LoginContainer";
import Head from "../../../components/head";
import stylesheet from "./index.css";
class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Login" />
        <div className={"content"}>
          <LoginContainer />
        </div>
        <style jsx>{stylesheet}</style>
      </React.Fragment>
    );
  }
}

export default Login;
