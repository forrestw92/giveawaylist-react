import React from "react";
import Link from "next/link";
import stylesheet from "./index.css";
import Form from "../../components/Form";
import Button from "../../components/Button";
import { login } from "../../API";
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  _onClick = () => {
    login({ ...this.state }).then(res => console.log(res));
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
      <section className={stylesheet["login"]}>
        <Form title={"Login"} _onChange={this._onChange} inputs={inputs}>
          <Button
            _onClick={this._onClick}
            label={"Login"}
            className={"login"}
            type={"button"}
          >
            Login
          </Button>
          <Link href={"/profile/register"}>
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
        </Form>
      </section>
    );
  }
}

export default LoginContainer;
