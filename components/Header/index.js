import React from "react";
import { func } from "prop-types";
import stylesheet from "./index.css";
import {connect} from "react-redux";
import { showHideMenu } from "../../Redux/actions/menuActions";
class Header extends React.Component {
  _onClick = () => {
    this.props.showHideMenu();
  };
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
          onClick={() => this._onClick()}
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
  showHideMenu: func.isRequired
};
export default connect(
  state => state,
  {
    showHideMenu
  }
)(Header);
