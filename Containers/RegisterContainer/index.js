import React from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import Form from "../../components/Form";
import Button from "../../components/Button";

import { register } from "../../API";
import { userLogin } from "../../Redux/actions/loginActions";

import stylesheet from "./index.css";

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
      message: "",
      socialLogin: true,
      errorUsername: false,
      errorEmail: false,
      errorEmail2: false,
      errorPassword: false,
      errorPassword2: false
    };
  }
  compareInputs = (a, b) => a !== "" && b !== "" && a === b;
  validateInputs = () => {
    if (!this.compareInputs(this.state.password, this.state.password2)) {
      this.setState({ errorPassword2: true, message: "Passwords must match." });
    } else {
      this.setState({ errorPassword2: false, message: "" });
    }
    if (!this.compareInputs(this.state.email, this.state.email2)) {
      this.setState({ errorEmail2: true, message: "Emails must match." });
    } else {
      this.setState({ errorEmail2: false, message: "" });
    }
  };
  _onSubmit = e => {
    e.preventDefault();
    const { username, email, email2, password, password2 } = this.state;
    register({ username, email, email2, password, password2 })
      .then(({ data }) => {
        this.setState({ message: data.msg });
        this.props.userLogin(data);
      })
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "INVALID_EMAIL") {
          this.setState({ errorEmail: true, email2: "", message: msg });
        }
        if (err === "EMAIL_TAKEN") {
          this.setState({
            errorEmail: true,
            email: "",
            email2: "",
            message: msg
          });
        }
        if (err === "USERNAME_TAKEN") {
          this.setState({
            errorUsername: true,
            username: "",
            message: msg
          });
        }
      });
  };
  _onChange = (e, state) => {
    switch (state) {
      case "username":
        this.setState({ username: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "password2":
        this.setState({ password2: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "email2":
        this.setState({ email2: e.target.value });
        break;
      default:
        break;
    }
  };
  render() {
    const inputs = [
      {
        label: "Username",
        value: this.state.username,
        type: "text",
        id: "username",
        name: "username",
        autoComplete: "off",
        hasError: this.state.errorUsername,
        onBlur: this.validateInputs
      },
      {
        label: "Email",
        value: this.state.email,
        type: "email",
        id: "email",
        name: "email",
        autoComplete: "off",
        hasError: this.state.errorEmail,
        onBlur: this.validateInputs
      },
      {
        label: "Repeat Email",
        value: this.state.email2,
        type: "email",
        id: "email2",
        name: "email2",
        autoComplete: "off",
        hasError: this.state.errorEmail2,
        onBlur: this.validateInputs
      },
      {
        label: "Password",
        value: this.state.password,
        type: "password",
        id: "password",
        name: "password",
        autoComplete: "off",
        hasError: this.state.errorPassword,
        onBlur: this.validateInputs
      },
      {
        label: "Repeat Password",
        value: this.state.password2,
        type: "password",
        id: "password2",
        name: "password2",
        autoComplete: "off",
        hasError: this.state.errorPassword2,
        onBlur: this.validateInputs
      }
    ];
    return (
      <main role="main" className={"register"}>
        <Form
          title={"Register"}
          {...this.state}
          _onChange={this._onChange}
          inputs={inputs}
          _onSubmit={this._onSubmit}
        >
          <p className={"register--error"} role={"alert"} aria-atomic="true">
            <span>{this.state.message}</span>
          </p>
          <Button
            _onClick={this._onSubmit}
            label={"Register"}
            className={"primary"}
            type={"button"}
          />
        </Form>
        <a
          href={"#"}
          onClick={() =>
            this.setState({ socialLogin: !this.state.socialLogin })
          }
          className={"switch--type"}
        >
          <h2>{this.state.socialLogin ? "Use Email" : "Use Social"}</h2>
        </a>
        <style jsx>{stylesheet}</style>
      </main>
    );
  }
}
RegisterContainer.propTypes = {
  userLogin: func.isRequired
};
export default connect(
  null,
  { userLogin }
)(RegisterContainer);
