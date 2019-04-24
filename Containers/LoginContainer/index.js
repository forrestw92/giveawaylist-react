import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { object, func } from "prop-types";
import Router from "next/router";
import { userLogin } from "../../Redux/actions/loginActions";
import stylesheet from "./index.css";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { login } from "../../API";
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  _onClick = () => {
    login({ ...this.state })
      .then(response => {
        document.cookie = `giveawayToken=${
          response.data.token
        }; path=/; expires=${new Date(
          new Date().getTime() + 15 * 24 * 60 * 60 * 1000
        ).toUTCString()};`;
        return this.props.userLogin(response.data);
      })
      .then(() => Router.push("/profile"))
      .catch(({ response }) => this.setState({ error: response.data.err }));
  };
  _onChange = (e, state) => {
    if (this.state.error) {
      this.setState({ error: "" });
    }
    if (state === "email") {
      this.setState({ email: e.target.value });
    } else if (state === "password") {
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
        autoComplete: "on"
      },
      {
        label: "Password",
        value: this.state.password,
        type: "password",
        id: "password",
        name: "password",
        autoComplete: "on"
      }
    ];
    return (
      <main role="main" className={"login"}>
        <Form title={"Login"} _onChange={this._onChange} inputs={inputs}>
          <Link href={"/profile/forgot"}>
            <a className={"forgot--password"}> Forgot password</a>
          </Link>
          <p className={"login--error"} role={"alert"} aria-atomic="true">
            <span>{this.state.error}</span>
          </p>
          <div className={"button--group"}>
            <Button
              _onClick={this._onClick}
              label={"Login"}
              className={"login"}
              type={"button"}
            >
              Login
            </Button>
            <Link prefetch href={"/profile/register"}>
              <Button
                _onClick={this._onClick}
                label={"Register"}
                className={"register"}
                href={"/profile/register"}
                type={"a"}
              >
                Register
              </Button>
            </Link>
          </div>
        </Form>
        {/*language=CSS*/}
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
