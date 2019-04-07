import React from "react";
import stylesheet from "./index.css";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { register } from "../../API";
class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      email2: "",
      password: "",
      password2: "",
      message: {}
    };
  }
  _onSubmit = e => {
    e.preventDefault();
    const sendData = this.state;
    delete sendData.message;
    register({ ...sendData })
      .then(res => this.setState({ message: res.response.data }))
      .catch(err => this.setState({ message: err.response.data }));
  };
  _onChange = (e, state) => {
    switch (state) {
      case "username":
        this.setState({ username: e.target.value });
        return true;
      case "password":
        this.setState({ password: e.target.value });
        return true;
      case "password2":
        this.setState({ password2: e.target.value });
        return true;
      case "email":
        this.setState({ email: e.target.value });
        return true;
      case "email2":
        this.setState({ email2: e.target.value });
        return true;
      default:
        return false;
    }
  };
  render() {
    const inputs = [
      {
        label: "Username",
        value: this.state.username,
        type: "text",
        id: "username",
        name: "username",
        autoComplete: "off"
      },
      {
        label: "Email",
        value: this.state.email,
        type: "email",
        id: "email",
        name: "email",
        autoComplete: "off"
      },
      {
        label: "Repeat Email",
        value: this.state.email2,
        type: "email",
        id: "email2",
        name: "email2",
        autoComplete: "off"
      },
      {
        label: "Password",
        value: this.state.password,
        type: "password",
        id: "password",
        name: "password",
        autoComplete: "off"
      },
      {
        label: "Repeat Password",
        value: this.state.password2,
        type: "password",
        id: "password2",
        name: "password2",
        autoComplete: "off"
      }
    ];
    return (
      <main role="main" className={stylesheet["register"]}>
        <Form
          title={"Register"}
          {...this.state}
          _onChange={this._onChange}
          inputs={inputs}
          _onSubmit={this._onSubmit}
        >
          {this.state.message && <p>{this.state.message.err}</p>}
          <Button
            _onClick={this._onSubmit}
            label={"Register"}
            className={"register"}
            type={"button"}
          />
        </Form>
      </main>
    );
  }
}

export default RegisterContainer;
