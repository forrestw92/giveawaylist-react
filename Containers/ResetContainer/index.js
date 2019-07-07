import React, { useState } from "react";
import { object } from "prop-types";
import { withRouter } from "next/router";

import Form from "../../components/Form";
import Button from "../../components/Button";

import { resetPassword } from "../../API";

import stylesheet from "./index.css";
function ResetContainer(props) {
  let [password, setPassword] = useState("");
  let [repeatPassword, setRepeatPassword] = useState("");
  let [message, setMessage] = useState("");
  let [errorRepeatPassword, setErrorRepeatPassword] = useState(false);
  let [errorPassword, setErrorPassword] = useState(false);
  const { router } = props;
  const { reset_key } = router.query.reset_key;
  const noResetKey = () => {
    setMessage("Make sure you click or copy the whole link from the email.");
  };
  const compareInputs = (a, b) => a !== "" && b !== "" && a === b;
  const validateInputs = () => {
    if (password === "") {
      setErrorPassword(true);
      setMessage("Make sure to fill out all fields.");
    }
    if (repeatPassword === "") {
      setErrorRepeatPassword(true);
      setMessage("Make sure to fill out all fields.");
    }
    if (!compareInputs(password, repeatPassword)) {
      setMessage("Make sure to fill out all fields.");
    }
  };
  function handleSubmit() {
    validateInputs();
    resetPassword({ password, repeatPassword, reset_key })
      .then(({ data }) => {
        const { success, msg } = data;
        if (success === "PASSWORD_UPDATED") {
          setMessage(msg);
          setRepeatPassword("");
          setPassword("");
        }
      })
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "PASSWORD_MISMATCH") {
          setErrorRepeatPassword(true);
          setRepeatPassword("");
        }
        if (err === "EXPIRED_LINK") {
          setPassword("");
          setRepeatPassword("");
        }
        setMessage(msg);
      });
  }
  const _onChange = (e, state) => {
    const { value } = e.target;
    if (message) {
      setMessage("");
    }
    if (state === "repeatPassword") {
      if (errorRepeatPassword) {
        setErrorRepeatPassword(false);
      }
      setRepeatPassword(value);
    } else if (state === "password") {
      if (password) {
        setErrorPassword(false);
      }
      setPassword(value);
    }
  };
  const inputs = [
    {
      label: "Password",
      value: password,
      type: "password",
      id: "password",
      name: "password",
      autoComplete: "off",
      hasError: errorPassword
    },
    {
      label: "Repeat Password",
      value: repeatPassword,
      type: "password",
      id: "repeatPassword",
      name: "repeatPassword",
      autoComplete: "off",
      hasError: errorRepeatPassword
    }
  ];
  return (
    <main role="main" className={"reset"}>
      <Form
        title={"Reset Password"}
        _onChange={_onChange}
        inputs={inputs}
        socialLogin={false}
      >
        <p className={"message"} role={"alert"} aria-atomic="true">
          <span>{message}</span>
        </p>
        <div className={"button--group"}>
          <Button
            _onClick={!reset_key ? noResetKey : handleSubmit}
            label={"Reset"}
            className={"primary"}
            type={"button"}
          />
        </div>
      </Form>
      <style jsx>{stylesheet}</style>
    </main>
  );
}
ResetContainer.propTypes = {
  router: object.isRequired
};
export default withRouter(ResetContainer);
