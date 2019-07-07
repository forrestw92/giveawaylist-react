import React from "react";
import LoginContainer from "../../../Containers/LoginContainer";
import Head from "../../../components/head";
import stylesheet from "./index.css";
function Login() {
  return (
    <React.Fragment>
      <Head title="Login - Amazon Giveaway List" />
      <div className={"content"}>
        <LoginContainer />
      </div>
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}

export default Login;
