import React, { useState, useEffect } from "react";
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
function Profile(props) {
  const { hideSubscriptions, error, userDetails } = props;

  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [errorPassword, setErrorPassword] = useState(false);
  let [errorNewPassword, setErrorNewPassword] = useState(false);
  let [endingGiveaways, setEndingGiveaways] = useState(
    props.endingGiveaways || false
  );
  let [alert, setAlert] = useState(undefined);
  let [message, setMessage] = useState(props.message || "");
  useEffect(() => {
    if (message) {
      setAlert(
        <Alert
          show={true}
          onDeath={() => {
            setAlert(undefined);
            Router.replace("/profile", "/profile", { shallow: true });
          }}
          alertType={error ? "danger" : "info"}
          ttl={3}
        >
          <p>{message}</p>
        </Alert>
      );
    }
  });
  const _onChange = (e, name) => {
    const { value } = e.target;
    if (name === "password") {
      setPassword(value);
      setErrorPassword(false);
    }
    if (name === "newPassword") {
      setNewPassword(value);
      setErrorNewPassword(false);
    }
    if (name === "endingGiveaways") {
      handleSubscriptions();
    }
  };
  const handlePasswordChange = () => {
    changePassword({ password, newPassword })
      .then(() => {
        setAlert(
          <Alert show={true} onDeath={() => setAlert(undefined)} ttl={3}>
            <p>Password changed!</p>
          </Alert>
        );
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
        setMessage(message);
        setErrorPassword(errorPassword);
        setErrorNewPassword(errorNewPassword);
      });
  };

  const handleSubscriptions = () => {
    changeSubscription({ endingGiveaways: !endingGiveaways })
      .then(({ data }) => {
        const { endingGiveaways } = data;
        setEndingGiveaways(endingGiveaways);
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        setAlert(
          <Alert
            show={true}
            onDeath={() => setAlert(undefined)}
            ttl={3}
            alertType={"danger"}
          >
            <p>{msg}</p>
          </Alert>
        );
      });
  };
  const inputs = [
    {
      label: "Current Password",
      value: password,
      type: "password",
      id: "password",
      name: "password",
      autoComplete: "off",
      hasError: errorPassword
    },
    {
      label: "New Password",
      value: newPassword,
      type: "password",
      id: "newPassword",
      name: "newPassword",
      autoComplete: "off",
      hasError: errorNewPassword
    }
  ];
  if (!userDetails) {
    return "";
  }
  return (
    <React.Fragment>
      <Head title="Amazon Giveaway List - Profile" />
      {alert}
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
                _onChange={_onChange}
                title={"Change Password"}
                inputs={inputs}
                socialLogin={false}
              >
                <p
                  className={"password--error"}
                  role={"alert"}
                  aria-atomic="true"
                >
                  <span>{message}</span>
                </p>
                <Button
                  _onClick={handlePasswordChange}
                  label={"Confirm"}
                  className={"primary"}
                  type={"button"}
                />
              </Form>
            </div>
          )}
          {!hideSubscriptions && (
            <div className="section" id="subscriptions">
              <Form _onChange={_onChange} title={"Subscriptions"}>
                <CheckBox
                  id={"endingGiveaways"}
                  name={"endingGiveaways"}
                  label={"Daily Ending Giveaways"}
                  checked={endingGiveaways}
                  _onChange={_onChange}
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
Profile.getInitialProps = async ({ query, ctx }) => {
  const { giveawayToken } = parseCookies(ctx);
  let hideSubscriptions = false;
  let endingGiveaways = false;
  setBearer(giveawayToken);

  await checkSubscription()
    .then(({ data }) => {
      const { isSubscribed } = data;
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
};
Profile.propTypes = {
  message: string,
  error: string,
  userDetails: object.isRequired,
  endingGiveaways: bool,
  hideSubscriptions: bool
};
function mapStateToProps(state) {
  return {
    userDetails: state.user.userDetails
  };
}
export default connect(mapStateToProps)(Profile);
