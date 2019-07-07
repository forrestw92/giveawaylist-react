import React, { useState } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";

import Form from "../../components/Form";
import Button from "../../components/Button";

import { register } from "../../API";
import { userLogin } from "../../Redux/actions/loginActions";

import stylesheet from "./index.css";
function RegisterContainer() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [email2, setEmail2] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");

  let [message, setMessage] = useState("");
  let [socialLogin, setSocialLogin] = useState(true);
  let [errorUsername, setErrorUsername] = useState(false);
  let [errorEmail, setErrorEmail] = useState(false);
  let [errorEmail2, setErrorEmail2] = useState(false);
  let [errorPassword] = useState(false);
  let [errorPassword2, setErrorPassword2] = useState(false);
  const compareInputs = (a, b) => a !== "" && b !== "" && a === b;
  const validateInputs = input => {
    if (input === "password2") {
      if (!compareInputs(password, password2)) {
        setErrorPassword2(true);
        setMessage("Passwords must match.");
      } else {
        setErrorPassword2(false);
        setMessage("");
      }
    }
    if (input === "email2") {
      if (!compareInputs(email, email2)) {
        setErrorEmail2(true);
        setMessage("Emails must match.");
      } else {
        setErrorEmail2(false);
        setMessage("");
      }
    }
  };
  const _onSubmit = e => {
    e.preventDefault();
    register({ username, email, email2, password, password2 })
      .then(({ data }) => {
        const { msg } = data;
        setMessage(msg);
        userLogin(data);
      })
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "INVALID_EMAIL") {
          setErrorEmail(true);
          setEmail2("");
        }
        if (err === "EMAIL_TAKEN") {
          setErrorEmail(true);
          setEmail("");
          setEmail2("");
        }
        if (err === "USERNAME_TAKEN") {
          setUsername("");
          setErrorUsername(true);
        }
        setMessage(msg);
      });
  };
  const _onChange = (e, state) => {
    const { value } = e.target;

    switch (state) {
      case "username":
        setUsername(value);

        break;
      case "password":
        setPassword(value);
        break;
      case "password2":
        setPassword2(value);

        break;
      case "email":
        setEmail(value);
        break;
      case "email2":
        setEmail2(value);
        break;
      default:
        break;
    }
  };
  const inputs = [
    {
      label: "Username",
      value: username,
      type: "text",
      id: "username",
      name: "username",
      autoComplete: "off",
      hasError: errorUsername,
      onBlur: validateInputs
    },
    {
      label: "Email",
      value: email,
      type: "email",
      id: "email",
      name: "email",
      autoComplete: "off",
      hasError: errorEmail,
      onBlur: validateInputs
    },
    {
      label: "Repeat Email",
      value: email2,
      type: "email",
      id: "email2",
      name: "email2",
      autoComplete: "off",
      hasError: errorEmail2,
      onBlur: validateInputs
    },
    {
      label: "Password",
      value: password,
      type: "password",
      id: "password",
      name: "password",
      autoComplete: "off",
      hasError: errorPassword,
      onBlur: validateInputs
    },
    {
      label: "Repeat Password",
      value: password2,
      type: "password",
      id: "password2",
      name: "password2",
      autoComplete: "off",
      hasError: errorPassword2,
      onBlur: validateInputs
    }
  ];
  return (
    <main role="main" className={"register"}>
      <Form
        title={"Register"}
        socialLogin={socialLogin}
        _onChange={_onChange}
        inputs={inputs}
        _onSubmit={_onSubmit}
      >
        <p className={"register--error"} role={"alert"} aria-atomic="true">
          <span>{message}</span>
        </p>
        <Button
          _onClick={_onSubmit}
          label={"Register"}
          className={"primary"}
          type={"button"}
        />
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
RegisterContainer.propTypes = {
  userLogin: func.isRequired
};
export default connect(
  null,
  { userLogin }
)(RegisterContainer);
