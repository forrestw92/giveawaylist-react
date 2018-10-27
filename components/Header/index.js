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
        <button
          className={stylesheet.menu}
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Navigation"
        >
          <img
            src="../../static/icons/menu.svg"
            className={stylesheet}
            alt="Giveaway List Logo"
          />
        </button>
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
