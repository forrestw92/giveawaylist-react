import React from "react";
import { string, object, bool } from "prop-types";
import Router from "next/router";

import Head from "../../components/head";
import Form from "../../components/Form";
import CheckBox from "../../components/CheckBox";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import stylesheet from "./index.css";

import {
  changePassword,
  changeSubscription,
  checkSubscription,
  setBearer
} from "../../API";
import { connect } from "react-redux";
import { parseCookies } from "nookies";
const validateMessages = {
  min: "New password much contain at least 8 characters.",
  max: "New password can not contain more than 100 characters.",
  uppercase: "New Password must contain uppercase characters.",
  lowercase: "New Password must contain lowercase characters"
};
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      errorPassword: false,
      errorNewPassword: false,
      endingGiveaways: props.endingGiveaways || false,
      alert: undefined,
      hideSubscriptions: false,
      message: ""
    };
  }

  static async getInitialProps({ query, ctx }) {
    const { giveawayToken } = parseCookies(ctx);
    let hideSubscriptions = false;
    let endingGiveaways = false;
    setBearer(giveawayToken);

    await checkSubscription()
      .then(({ data }) => {
        const { isSubscribed } = data;
        console.log(data);
        if (isSubscribed) {
          endingGiveaways = true;
        }
      })
      .catch(({ response }) => {
        const { err } = response.data;
        if (err === "INVALID_EMAIL") {
          hideSubscriptions = true;
        }
      });
    if (query.message) {
      const { err, msg } = query.message;
      return { message: msg, error: err };
    }
    return { endingGiveaways, hideSubscriptions };
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
      this.setState({ password: inputVal, errorPassword: false });
    }
    if (name === "newPassword") {
      this.setState({ newPassword: inputVal, errorNewPassword: false });
    }
    if (name === "endingGiveaways") {
      this.handleSubscriptions();
    }
  };

  handlePasswordChange = () => {
    const { password, newPassword } = this.state;
    changePassword({ password, newPassword })
      .then(() => {
        const alert = (
          <Alert
            show={true}
            onDeath={() => this.setState({ alert: undefined })}
            ttl={3}
          >
            <p>Password changed!</p>
          </Alert>
        );
        this.setState({ alert });
      })
      .catch(({ response }) => {
        const { msg, err, validate } = response.data;
        const message = validate ? validateMessages[validate[0]] : msg;
        let errorPassword = false;
        let errorNewPassword = false;

        if (err === "INCORRECT_PASSWORD") {
          errorPassword = true;
        }
        if (err === "EMPTY_FIELDS") {
          errorPassword = true;
          errorNewPassword = true;
        }
        if (validate) {
          errorNewPassword = true;
        }
        this.setState({
          message,
          errorPassword,
          errorNewPassword
        });
      });
  };
  handleSubscriptions = () => {
    changeSubscription({ endingGiveaways: !this.state.endingGiveaways })
      .then(({ data }) => {
        const { endingGiveaways } = data;
        this.setState({ endingGiveaways: endingGiveaways });
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        const alert = (
          <Alert
            show={true}
            onDeath={() => this.setState({ alert: undefined })}
            ttl={3}
            alertType={"danger"}
          >
            <p>{msg}</p>
          </Alert>
        );
        this.setState({ alert });
      });
  };

  render() {
    const { userDetails } = this.props;
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
                {!userDetails.social && (
                  <li className={"nav--item"}>
                    <a href="#changePassword">Change Password</a>
                  </li>
                )}
                <li className={"nav--item"}>
                  <a href="#subscriptions">Subscriptions</a>
                </li>
              </ul>
            </nav>
          </aside>
          <main className={"content"}>
            <div className="section" id={"stats"}>
              <h1 className="title">Stats</h1>
              <div className="stats">
                You have been a member since{" "}
                {new Date(userDetails.register_date).toDateString()}
              </div>
            </div>
            {!userDetails.social && (
              <div className="section" id="changePassword">
                <Form
                  _onChange={this._onChange}
                  title={"Change Password"}
                  inputs={inputs}
                  socialLogin={false}
                >
                  <p
                    className={"password--error"}
                    role={"alert"}
                    aria-atomic="true"
                  >
                    <span>{this.state.message}</span>
                  </p>
                  <Button
                    _onClick={this.handlePasswordChange}
                    label={"Confirm"}
                    className={"primary"}
                    type={"button"}
                  />
                </Form>
              </div>
            )}
            {!this.state.hideSubscriptions && (
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
            )}
          </main>
        </div>
        <style jsx>{stylesheet}</style>
      </React.Fragment>
    );
  }
}
Profile.propTypes = {
  message: string,
  error: string,
  userDetails: object.isRequired,
  endingGiveaways: bool
};
function mapStateToProps(state) {
  return {
    userDetails: state.user.userDetails
  };
}
export default connect(mapStateToProps)(Profile);
