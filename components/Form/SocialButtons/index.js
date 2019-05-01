import React from "react";
import stylesheet from "./index.css";

const GOOGLE_LOGIN = process.env.GOOGLE_LOGIN;
const FACEBOOK_LOGIN = process.env.FACEBOOK_LOGIN;
const TWITTER_LOGIN = process.env.TWITTER_LOGIN;
const SocialButtons = () => {
  return (
    <div className={"social--icons"}>
      <a href={FACEBOOK_LOGIN} id="facebook" className="social--btn">
        Connect with Facebook
      </a>
      <a href={TWITTER_LOGIN} id="twitter" className="social--btn">
        Connect with Twitter
      </a>
      <a href={GOOGLE_LOGIN} id="google" className="social--btn">
        Connect with Google
      </a>
      <style jsx>{stylesheet}</style>
    </div>
  );
};
export default SocialButtons;
