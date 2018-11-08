import React from "react";
import stylesheet from "./index.css";
import Navigation from "../Navigation";
class Header extends React.Component {
  render() {
    return (
      <header className={stylesheet.header}>
        <Navigation />
      </header>
    );
  }
}
export default Header;
