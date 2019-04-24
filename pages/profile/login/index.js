import React from "react";
import LoginContainer from "../../../Containers/LoginContainer";
import Head from "../../../components/head";

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Login" />
        <div className={"content"}>
          <LoginContainer />
        </div>
        <style jsx scoped>
          {`
            .content {
              margin: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default Login;
