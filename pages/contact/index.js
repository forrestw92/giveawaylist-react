import React from "react";
import Head from "../../components/head";

import stylesheet from "./index.css";
import InputGroup from "../../components/Form/InputGroup";
import Button from "../../components/Button";
import { sendMessage } from "../../API";

class Contact extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      name: "",
      formMessage: undefined,
      error: false,
      errorEmail: false
    };
  }

  _onChange = (e, name) => {
    const { value } = e.target;
    switch (name) {
      case "message":
        this.setState({ message: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
      case "name":
        this.setState({ name: value });
        break;
      default:
        return;
    }
  };
  handleForm = e => {
    e.preventDefault();
    const { message, name, email } = this.state;
    if (!message || !name || !email) {
      this.setState({ formMessage: "Please fill out all fields", error: true });
    } else {
      sendMessage({ message, name, email })
        .then(({ data }) => {
          const { msg, success } = data;
          if (success === "MESSAGE_SENT") {
            this.setState({ formMessage: msg, error: false });
          }
        })
        .catch(({ response }) => {
          const { msg } = response.data;
          this.setState({ formMessage: msg, error: true });
        });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Head title="Contact - Amazon Giveaway List" description={""} />
        <main className={"content"}>
          <div className="contact">
            <h1 className={"title"}>Contact</h1>
            <form onChange={this._onChange} className={"contact-form"}>
              <InputGroup
                _onChange={this._onChange}
                label={"Email"}
                value={this.state.email}
                type={"email"}
                id={"email"}
                name={"email"}
                autoComplete={"on"}
              />
              <InputGroup
                _onChange={this._onChange}
                label={"Name"}
                value={this.state.name}
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
                  onChange={e => this._onChange(e, "message")}
                  value={this.state.message}
                  name={"message"}
                />
                <label
                  htmlFor="message"
                  className={this.state.message && "input--filled"}
                >
                  Message
                </label>
              </div>
              <p
                className={`message ${this.state.error ? "error" : "success"}`}
                role={"alert"}
                aria-atomic="true"
              >
                <span>{this.state.formMessage}</span>
              </p>
              <Button
                _onClick={this.handleForm}
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
}
export default Contact;
