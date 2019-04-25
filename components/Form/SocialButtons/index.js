import React from "react";
import stylesheet from "./index.css";

const GOOGLE_LOGIN = "https://forrestwalker.me/api/o1/auth/google";
const FACEBOOK_LOGIN = "https://forrestwalker.me/api/o1/auth/facebook";
const TWITTER_LOGIN = "https://forrestwalker.me/api/o1/auth/twitter";
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
      {/*language=CSS*/}
      <style jsx>{stylesheet}</style>
    </div>
  );
};
export default SocialButtons;
