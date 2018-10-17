import React, { Component } from "react";
import stylesheet from "../../Containers/RegisterContainer/index.css";

const SocialIcons = () => {
  return <div className={stylesheet["social--icons"]}>
    <img alt="Facebook Login" src={"../../static/icons/facebook.svg"} />
    <img alt="Twitter Login" src={"../../static/icons/twitter.svg"} />
    <img alt="Google Login" src={"../../static/icons/google.svg"} />
  </div>;
};
export default SocialIcons;
