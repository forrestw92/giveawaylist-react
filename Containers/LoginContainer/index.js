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
        document.cookie = `giveawayToken=${response.data.token}`;
        return this.props.userLogin(response.data);
      })
      .then(() => Router.push("/profile"))
      .catch(res => console.log({ error: res }));
  };
  _onChange = (e, state) => {
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
      <main role="main" className={stylesheet["login"]}>
        <Form title={"Login"} _onChange={this._onChange} inputs={inputs}>
          <span style={{ color: "#E63946", textAlign: "center" }}>
            {this.state.error}
          </span>
          <div className={stylesheet["button--group"]}>
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
