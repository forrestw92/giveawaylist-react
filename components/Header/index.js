import React from "react";
import { string } from "prop-types";
import stylesheet from "./index.css";
class Header extends React.Component {
  render() {
    return (
      <header className={stylesheet.header}>
        <img
          src="../../static/logo.svg"
          className={stylesheet.logo}
          alt="Giveaway List Logo"
        />
      </header>
    );
  }
}
Header.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Header;
