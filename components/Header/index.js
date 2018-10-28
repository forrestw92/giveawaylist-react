import React from "react";
import { func, bool } from "prop-types";
import stylesheet from "./index.css";
import { connect } from "react-redux";
import { showHideMenu } from "../../Redux/actions/menuActions";
class Header extends React.Component {
  _onClick = () => {
    this.props.showHideMenu();
  };
  render() {
    const { menuOpen } = this.props;
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
          aria-expanded={menuOpen}
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
  showHideMenu: func.isRequired,
  menuOpen: bool.isRequired
};
function mapStateToProps(state) {
  return {
    menuOpen: state.menus.menuOpen
  };
}
export default connect(
  mapStateToProps,
  {
    showHideMenu
  }
)(Header);
