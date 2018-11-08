import React from "react";
import { func, bool } from "prop-types";
import stylesheet from "./index.css";
import { connect } from "react-redux";
import { showHideMenu } from "../../Redux/actions/menuActions";
import Navigation from "../Navigation";
class Header extends React.Component {
  _onClick = () => {
    this.props.showHideMenu();
  };
  render() {
    const { menuOpen } = this.props;
    return (
      <header className={stylesheet.header}>
        <Navigation currentPage={"/"} />
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
