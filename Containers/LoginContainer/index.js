import React, { useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { object, func } from "prop-types";
import Router from "next/router";
import { userLogin } from "../../Redux/actions/loginActions";
import stylesheet from "./index.css";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { login, setBearer } from "../../API";
function LoginContainer(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let [socialLogin, setSocialLogin] = useState(true);
  let [errorEmail, setErrorEmail] = useState(false);
  let [errorPassword, setErrorPassword] = useState(false);
  const { userLogin } = props;
  const _onClick = () => {
    login({ email, password })
      .then(({ data }) => {
        document.cookie = `giveawayToken=${
          data.token
        }; path=/; expires=${new Date(
          new Date().getTime() + 15 * 24 * 60 * 60 * 1000
        ).toUTCString()};`;
        setBearer(data.token);
        return userLogin(data);
      })
      .then(() => Router.push("/profile"))
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "MAX_LOGIN_ATTEMPTS") {
          setMessage(msg);
          setPassword("");
        }
        if (err === "INVALID_ACCOUNT") {
          setErrorEmail(true);
          setMessage(msg);
        }
        if (err === "PASSWORD_INCORRECT") {
          setPassword("");
          setMessage(msg);
          setErrorPassword(true);
        }
      });
  };
  const _onChange = (e, state) => {
    const { value } = e.target;
    if (message) {
      setMessage("");
    }
    if (state === "email") {
      if (errorEmail) {
        setErrorEmail(false);
      }
      setEmail(value);
    } else if (state === "password") {
      if (password) {
        setErrorPassword(false);
      }
      setPassword(value);
    }
  };
  const inputs = [
    {
      label: "Username or Email",
      value: email,
      type: "text",
      id: "email",
      name: "email",
      autoComplete: "on",
      hasError: errorEmail
    },
    {
      label: "Password",
      value: password,
      type: "password",
      id: "password",
      name: "password",
      autoComplete: "on",
      hasError: errorPassword
    }
  ];
  return (
    <main role="main" className={"login"}>
      <Form
        title={"Login"}
        _onChange={_onChange}
        inputs={inputs}
        socialLogin={socialLogin}
      >
        <Link href={"/profile/forgot"}>
          <a className={"forgot--password"}> Forgot password</a>
        </Link>
        <p className={"message"} role={"alert"} aria-atomic="true">
          <span>{message}</span>
        </p>
        <div className={"button--group"}>
          <Button
            _onClick={_onClick}
            label={"Login"}
            className={"primary"}
            type={"button"}
          >
            Login
          </Button>
          <Link prefetch href={"/profile/register"}>
            <Button
              _onClick={_onClick}
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
        onClick={() => setSocialLogin(!socialLogin)}
        className={"switch--type"}
      >
        <h2>{socialLogin ? "Use Email" : "Use Social"}</h2>
      </a>
      <style jsx>{stylesheet}</style>
    </main>
  );
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
