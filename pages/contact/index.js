import React, { useState } from "react";
import Head from "../../components/head";

import stylesheet from "./index.css";
import InputGroup from "../../components/Form/InputGroup";
import Button from "../../components/Button";
import { sendMessage } from "../../API";
import { logEvent } from "../../utils/analytics";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [formMessage, setFormMessage] = useState(undefined);
  const [error, setError] = useState(false);
  const _onChange = (e, name) => {
    const { value } = e.target;
    switch (name) {
      case "message":
        setMessage(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "name":
        setName(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!message || !name || !email) {
      setFormMessage("Please fill out all fields.");
      setError(true);
    } else {
      sendMessage({ message, name, email })
        .then(({ data }) => {
          const { msg, success } = data;
          if (success === "MESSAGE_SENT") {
            setFormMessage(msg);
            setError(false);
            logEvent("submit_form", "Contact", message);
          }
        })
        .catch(({ response }) => {
          const { msg } = response.data;
          setFormMessage(msg);
          setError(true);
        });
    }
  };
  return (
    <React.Fragment>
      <Head title="Contact - Amazon Giveaway List" description={""} />
      <main className={"content"}>
        <div className="contact">
          <h1 className={"title"}>Contact</h1>
          <form onChange={_onChange} className={"contact-form"}>
            <InputGroup
              _onChange={_onChange}
              label={"Email"}
              value={email}
              type={"email"}
              id={"email"}
              name={"email"}
              autoComplete={"on"}
            />
            <InputGroup
              _onChange={_onChange}
              label={"Name"}
              value={name}
              type={"name"}
              id={"name"}
              name={"name"}
              autoComplete={"off"}
            />
            <div className="input--group">
              <textarea
                rows="10"
                className={"textarea"}
                id={"message"}
                onChange={e => _onChange(e, "message")}
                value={message}
                name={"message"}
              />
              <label htmlFor="message" className={message && "input--filled"}>
                Message
              </label>
            </div>
            <p
              className={`message ${error ? "error" : "success"}`}
              role={"alert"}
              aria-atomic="true"
            >
              <span>{formMessage}</span>
            </p>
            <Button
              _onClick={handleSubmit}
              label={"Send"}
              className={"primary"}
              type={"button"}
            />
          </form>
        </div>
      </main>
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}
export default Contact;
