import React from "react";
import stylesheet from "./index.css";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { forgotPassword } from "../../API";
class ForgotContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      errorEmail: false
    };
  }

  _onClick = () => {
    if (this.state.email === "") {
      this.setState({
        errorEmail: true,
        message: "Please enter a valid email."
      });
      return;
    }
    forgotPassword({ ...this.state })
      .then(({ data }) => {
        const { msg, success } = data;
        if (success) {
          this.setState({ message: msg });
        }
      })
      .catch(({ response }) => {
        const { err, msg } = response.data;
        if (err === "PASSWORD_TIMER") {
          this.setState({ message: msg });
        }
        if (err === "INVALID_ACCOUNT") {
          this.setState({ errorEmail: true, email: "", message: msg });
        }
        if (err === "INVALID_EMAIL") {
          this.setState({ errorEmail: true, message: msg });
        }
      });
  };
  _onChange = (e, name) => {
    if (this.state.error) {
      this.setState({ error: "" });
    }
    if (name === "email") {
      if (this.state.errorEmail) {
        this.setState({ errorEmail: false });
      }
      this.setState({ email: e.target.value });
    }
  };
  render() {
    const inputs = [
      {
        label: "Account Email",
        value: this.state.email,
        type: "text",
        id: "email",
        name: "email",
        autoComplete: "off",
        hasError: this.state.errorEmail
      }
    ];
    return (
      <main role="main" className={"forgot--password"}>
        <Form
          title={"Forgot Password"}
          _onChange={this._onChange}
          inputs={inputs}
          socialLogin={false}
        >
          <p className={"message"} role={"alert"} aria-atomic="true">
            <span>{this.state.message}</span>
          </p>
          <div className={"button--group"}>
            <Button
              _onClick={this._onClick}
              label={"Request"}
              className={"login"}
              type={"button"}
            />
          </div>
        </Form>
        <style jsx>{stylesheet}</style>
      </main>
    );
  }
}
export default ForgotContainer;
