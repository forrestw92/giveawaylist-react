import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { object, func } from "prop-types";
import Router from "next/router";
import { userLogin } from "../../Redux/actions/loginActions";
import stylesheet from "./index.css";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { login, setBearer } from "../../API";
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      socialLogin: true,
      errorEmail: false,
      errorPassword: false
    };
  }
  _onClick = () => {
    login({ ...this.state })
      .then(({ data }) => {
        document.cookie = `giveawayToken=${
          data.token
        }; path=/; expires=${new Date(
          new Date().getTime() + 15 * 24 * 60 * 60 * 1000
        ).toUTCString()};`;
        setBearer(data.token);
        return this.props.userLogin(data);
      })
      .then(() => Router.push("/profile"))
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "MAX_LOGIN_ATTEMPTS") {
          this.setState({ message: msg, password: "" });
        }
        if (err === "INVALID_ACCOUNT") {
          this.setState({ errorEmail: true, message: msg });
        }
        if (err === "PASSWORD_INCORRECT") {
          this.setState({ errorPassword: true, message: msg, password: "" });
        }
      });
  };
  _onChange = (e, state) => {
    if (this.state.message) {
      this.setState({ message: "" });
    }
    if (state === "email") {
      if (this.state.errorEmail) {
        this.setState({ errorEmail: false });
      }
      this.setState({ email: e.target.value });
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
        label: "Username or Email",
        value: this.state.email,
        type: "text",
        id: "email",
        name: "email",
        autoComplete: "on",
        hasError: this.state.errorEmail
      },
      {
        label: "Password",
        value: this.state.password,
        type: "password",
        id: "password",
        name: "password",
        autoComplete: "on",
        hasError: this.state.errorPassword
      }
    ];
    return (
      <main role="main" className={"login"}>
        <Form
          title={"Login"}
          _onChange={this._onChange}
          inputs={inputs}
          socialLogin={this.state.socialLogin}
        >
          <Link href={"/profile/forgot"}>
            <a className={"forgot--password"}> Forgot password</a>
          </Link>
          <p className={"message"} role={"alert"} aria-atomic="true">
            <span>{this.state.message}</span>
          </p>
          <div className={"button--group"}>
            <Button
              _onClick={this._onClick}
              label={"Login"}
              className={"primary"}
              type={"button"}
            >
              Login
            </Button>
            <Link prefetch href={"/profile/register"}>
              <Button
                _onClick={this._onClick}
                label={"Register"}
                className={"primary"}
                href={"/profile/register"}
                type={"a"}
              >
                Register
              </Button>
            </Link>
          </div>
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
LoginContainer.propTypes = {
  userLogin: func.isRequired,
  user: object
};
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { userLogin }
)(LoginContainer);
