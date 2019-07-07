import React, { useState } from "react";
import stylesheet from "./index.css";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { forgotPassword } from "../../API";
function ForgotContainer() {
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  let [errorEmail, setErrorEmail] = useState(false);

  const _onClick = () => {
    if (email === "") {
      setErrorEmail(true);
      setMessage("Please enter a valid email.");
      return;
    }
    forgotPassword(email)
      .then(({ data }) => {
        const { msg, success } = data;
        if (success) {
          setMessage(msg);
        }
      })
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "PASSWORD_TIMER") {
          setMessage(msg);
        }
        if (err === "INVALID_ACCOUNT") {
          setMessage(msg);
          setEmail("");
          setErrorEmail(true);
        }
        if (err === "INVALID_EMAIL") {
          setErrorEmail(false);
          setMessage(msg);
        }
      });
  };
  const _onChange = (e, name) => {
    if (message) {
      setMessage("");
    }
    if (name === "email") {
      if (errorEmail) {
        setErrorEmail(false);
      }
      setEmail(e.target.value);
    }
  };
  const inputs = [
    {
      label: "Account Email",
      value: email,
      type: "text",
      id: "email",
      name: "email",
      autoComplete: "off",
      hasError: errorEmail
    }
  ];
  return (
    <main role="main" className={"forgot--password"}>
      <Form
        title={"Forgot Password"}
        _onChange={_onChange}
        inputs={inputs}
        socialLogin={false}
      >
        <p className={"message"} role={"alert"} aria-atomic="true">
          <span>{message}</span>
        </p>
        <div className={"button--group"}>
          <Button
            _onClick={_onClick}
            label={"Request"}
            className={"primary"}
            type={"button"}
          />
        </div>
      </Form>
      <style jsx>{stylesheet}</style>
    </main>
  );
}
export default ForgotContainer;
