import React from "react";
import stylesheet from "./index.css";
const GOOGLE_LOGIN = "https://forrestwalker.me/api/o1/auth/google";
const FACEBOOK_LOGIN = "https://forrestwalker.me/api/o1/auth/facebook";
const TWITTER_LOGIN = "https://forrestwalker.me/api/o1/auth/twitter";
const SocialIcons = () => {
  return (
    <div className={stylesheet["social--icons"]}>
      <a href={FACEBOOK_LOGIN}>
        <img alt="Facebook Login" src={"../../static/icons/facebook.svg"} />
      </a>
      <a href={TWITTER_LOGIN}>
        <img alt="Twitter Login" src={"../../static/icons/twitter.svg"} />
      </a>
      <a href={GOOGLE_LOGIN}>
        <img alt="Google Login" src={"../../static/icons/google.svg"} />
      </a>
    </div>
  );
};
export default SocialIcons;
