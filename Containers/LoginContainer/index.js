import React from "react";

import stylesheet from "./index.css";
import Form from "../../components/Form";
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  _onChange = (e, state) => {
    if (state === "username") {
      this.setState({ username: e.target.value });
    } else if (state === "password") {
      this.setState({ password: e.target.value });
    }
  };
  render() {
    const inputs = [
      {
        label: "Username or Email",
        value: this.state.username,
        type: "text",
        id: "username",
        name: "username",
        autoComplete: "true"
      },
      {
        label: "Password",
        value: this.state.password,
        type: "password",
        id: "password",
        name: "password",
        autoComplete: "true"
      }
    ];
    return (
      <section className={stylesheet["login"]}>
        <Form title={"Login"} _onChange={this._onChange} inputs={inputs} />
      </section>
    );
  }
}

export default LoginContainer;
