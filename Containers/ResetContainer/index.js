import React from "react";
import { object } from "prop-types";
import { withRouter } from "next/router";

import Form from "../../components/Form";
import Button from "../../components/Button";

import { resetPassword } from "../../API";

import stylesheet from "./index.css";

class ResetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      repeatPassword: "",
      message: "",
      socialLogin: true,
      errorRepeatPassword: false,
      errorPassword: false,
      reset_key: props.router.query.reset_key || false
    };
  }
  noResetKey = () => {
    this.setState({
      message: "Make sure you click or copy the whole link from the email."
    });
  };
  compareInputs = (a, b) => a !== "" && b !== "" && a === b;
  validateInputs = () => {
    const { password, repeatPassword } = this.state;
    if (password === "") {
      this.setState({ errorPassword: true });
    }
    if (repeatPassword === "") {
      this.setState({ errorRepeatPassword: true });
    }
    if (!this.compareInputs(password, repeatPassword)) {
      this.setState({ message: "Make sure to fill out all fields." });
    }
  };
  _onClick = () => {
    const { password, repeatPassword, reset_key } = this.state;
    if (password === "") {
      this.setState({
        errorPassword: true,
        message: "Make sure to fill out all fields."
      });
      return;
    }
    if (repeatPassword === "") {
      this.setState({
        errorRepeatPassword: true,
        message: "Make sure to fill out all fields."
      });
      return;
    }
    if (!this.compareInputs(password, repeatPassword)) {
      this.setState({ message: "Make sure to fill out all fields." });
      return;
    }
    resetPassword({ password, repeatPassword, reset_key })
      .then(({ data }) => {
        const { success, msg } = data;
        if (success === "PASSWORD_UPDATED") {
          this.setState({ message: msg, repeatPassword: "", password: "" });
        }
      })
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "INVALID_RESET_KEY") {
          this.setState({ message: msg });
        }
        if (err === "PASSWORD_MISMATCH") {
          this.setState({ emailRepeatPassword: true, message: msg });
        }
        if (err === "INVALID_ACCOUNT") {
          this.setState({
            message: msg
          });
        }
        if (err === "EXPIRED_LINK") {
          this.setState({ password: "", repeatPassword: "", message: msg });
        }
        if (err === "RESET_FAILED") {
          this.setState({ message: msg });
        }
      });
  };
  _onChange = (e, state) => {
    if (this.state.message) {
      this.setState({ message: "" });
    }
    if (state === "repeatPassword") {
      if (this.state.errorRepeatPassword) {
        this.setState({ errorRepeatPassword: false });
      }
      this.setState({ repeatPassword: e.target.value });
    } else if (state === "password") {
      if (this.state.password) {
        this.setState({ errorPassword: false });
      }
      this.setState({ password: e.target.value });
    }
  };
  render() {
    const inputs = [
      {
        label: "Password",
        value: this.state.password,
        type: "password",
        id: "password",
        name: "password",
        autoComplete: "off",
        hasError: this.state.errorPassword
      },
      {
        label: "Repeat Password",
        value: this.state.repeatPassword,
        type: "password",
        id: "repeatPassword",
        name: "repeatPassword",
        autoComplete: "off",
        hasError: this.state.errorRepeatPassword
      }
    ];
    return (
      <main role="main" className={"reset"}>
        <Form
          title={"Reset Password"}
          _onChange={this._onChange}
          inputs={inputs}
          socialLogin={false}
        >
          <p className={"message"} role={"alert"} aria-atomic="true">
            <span>{this.state.message}</span>
          </p>
          <div className={"button--group"}>
            <Button
              _onClick={!this.state.reset_key ? this.noResetKey : this._onClick}
              label={"Reset"}
              className={"login"}
              type={"button"}
            />
          </div>
        </Form>
        <style jsx>{stylesheet}</style>
      </main>
    );
  }
}
ResetContainer.propTypes = {
  router: object.isRequired
};
export default withRouter(ResetContainer);
