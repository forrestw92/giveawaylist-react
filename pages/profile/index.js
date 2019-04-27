import React from "react";
import { string } from "prop-types";
import Router from "next/router";

import Head from "../../components/head";
import Form from "../../components/Form";
import CheckBox from "../../components/CheckBox";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import stylesheet from "./index.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      errorPassword: false,
      errorNewPassword: false,
      endingGiveaways: false,
      alert: undefined
    };
  }

  static async getInitialProps({ query }) {
    //TODO Handle query.message from confirm link
    if (query.message) {
      const { err, msg } = query.message;
      console.log(query.message);
      return { message: msg, error: err };
    }
    return {};
  }
  componentDidMount() {
    const { message, error } = this.props;
    if (message) {
      this.setState({
        alert: (
          <Alert
            show={true}
            onDeath={() => {
              this.setState({ alert: undefined }, () => {
                Router.replace("/profile", "/profile", { shallow: true });
              });
            }}
            alertType={error ? "danger" : "info"}
            ttl={3}
          >
            <p>{message}</p>
          </Alert>
        )
      });
    }
  }

  _onChange = (e, name) => {
    const inputVal = e.target.value;
    if (name === "password") {
      this.setState({ password: inputVal });
    }
    if (name === "newPassword") {
      this.setState({ newPassword: inputVal });
    }
    if (name === "endingGiveaways") {
      this.setState({ endingGiveaways: !this.state.endingGiveaways }, () => {
        this.handleSubscriptions();
      });
    }
  };
  handlePasswordChange = () => {
    //TODO Change password
  };
  handleDeleteAccount = () => {
    //TODO Handle delete account
  };
  handleSubscriptions = () => {
    //TODO Handle email subscriptions.
  };
  render() {
    const inputs = [
      {
        label: "Current Password",
        value: this.state.password,
        type: "password",
        id: "password",
        name: "password",
        autoComplete: "off",
        hasError: this.state.errorPassword
      },
      {
        label: "New Password",
        value: this.state.newPassword,
        type: "password",
        id: "newPassword",
        name: "newPassword",
        autoComplete: "off",
        hasError: this.state.errorNewPassword
      }
    ];
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Profile" />
        {this.state.alert}
        <div className={"profile"}>
          <aside className={"sticky"}>
            <nav role={"navigation"} className={"profile--nav"}>
              <ul className={"nav--items"}>
                <li className={"nav--item active"}>
                  <a href="#stats">Profile</a>
                </li>
                <li className={"nav--item"}>
                  <a href="#changePassword">Change Password</a>
                </li>
                <li className={"nav--item"}>
                  <a href="#subscriptions">Subscriptions</a>
                </li>
                <li className="nav--item">
                  <a href="#deleteAccount">Delete Account</a>
                </li>
              </ul>
            </nav>
          </aside>
          <main className={"content"}>
            <div className="section" id={"stats"}>
              <h1 className="title">Stats</h1>
              <div className="stats">
                You have been a member since {new Date().toLocaleString()}
              </div>
              <div className="stats">
                You have views 900 giveaways in past 7 days
              </div>
              <div className="stats">
                You have saved 9 giveaways in past 7 days
              </div>
            </div>
            <div className="section" id="changePassword">
              <Form
                _onChange={this._onChange}
                title={"Change Password"}
                inputs={inputs}
                socialLogin={false}
              >
                <Button
                  _onClick={this.handlePasswordChange}
                  label={"Confirm"}
                  className={"login"}
                  type={"button"}
                />
              </Form>
            </div>
            <div className="section" id="subscriptions">
              <Form _onChange={this._onChange} title={"Subscriptions"}>
                <CheckBox
                  id={"endingGiveaways"}
                  name={"endingGiveaways"}
                  label={"Daily Ending Giveaways"}
                  checked={this.state.endingGiveaways}
                  _onChange={this._onChange}
                />
              </Form>
            </div>
            <div className="section" id="deleteAccount">
              <Form _onChange={this._onChange} title={"Delete Account"}>
                <Button
                  _onClick={this.handleDeleteAccount}
                  label={"Delete Account"}
                  className={"danger"}
                  type={"button"}
                />
              </Form>
            </div>
          </main>
        </div>
        <style jsx>{stylesheet}</style>
      </React.Fragment>
    );
  }
}
Profile.propTypes = {
  message: string,
  error: string
};
export default Profile;
