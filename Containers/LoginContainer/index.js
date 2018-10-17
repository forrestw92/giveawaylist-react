import React from "react";

import stylesheet from "./index.css";
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
    return (
      <section className={stylesheet["login"]}>
        <h1 className={stylesheet["title"]}>Login</h1>
        <div className={stylesheet["social--icons"]}>
          <img alt="Facebook Login" src={"../../static/icons/facebook.svg"} />
          <img alt="Twitter Login" src={"../../static/icons/twitter.svg"} />
          <img alt="Google Login" src={"../../static/icons/google.svg"} />
        </div>
        <form>
          <div className={stylesheet["input--group"]}>
            <input
              type={"text"}
              className={stylesheet["input"]}
              id={"username"}
              name={"username"}
              onChange={e => this._onChange(e, "username")}
              value={this.state.username}
            />
            <label
              htmlFor={"username"}
              className={
                this.state.username ? stylesheet["input--filled"] : undefined
              }
            >
              Username/Email
            </label>
          </div>
          <div className={stylesheet["input--group"]}>
            <input
              type={"password"}
              className={stylesheet["input"]}
              id={"password"}
              name={"password"}
              onChange={e => this._onChange(e, "password")}
              value={this.state.password}
            />
            <label
              htmlFor={"password"}
              className={
                this.state.password ? stylesheet["input--filled"] : undefined
              }
            >
              Password
            </label>
          </div>
        </form>
      </section>
    );
  }
}

export default LoginContainer;
