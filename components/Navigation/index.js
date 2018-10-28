import React from "react";
import { string, bool } from "prop-types";
import stylesheet from "./index.css";
import Link from "next/link";
import { connect } from "react-redux";
const links = [
  {
    href: "/",
    label: "Home",
    isActive: true,
    shouldRender: true,
    className: "nav--item"
  },
  {
    href: "/ending",
    label: "Ending Giveaways",
    isActive: true,
    shouldRender: true,
    className: "nav--item"
  },
  {
    href: "/saved",
    label: "Saved Giveaways",
    isActive: true,
    shouldRender: true,
    className: "nav--item"
  },
  {
    href: "/ebooks",
    label: "eBooks Giveaways",
    isActive: true,
    shouldRender: true,
    className: "nav--item"
  },
  {
    href: "/sweepstakes",
    label: "Sweepstakes",
    isActive: true,
    shouldRender: false,
    className: "nav--item"
  },
  {
    href: "/profile",
    label: "Profile",
    isActive: true,
    shouldRender: true,
    className: "nav--item"
  },
  {
    href: "/profile/login",
    label: "Login",
    isActive: true,
    shouldRender: true,
    className: "nav--item"
  }
].map((item, idx) => {
  item.key = idx;
  return item;
});

class Navigation extends React.PureComponent {
  render() {
    const { currentPage, menuOpen } = this.props;
    const renderLinks = links.filter(link => link.shouldRender);
    return (
      <nav role="navigation">
        <ul
          className={
            menuOpen
              ? `${stylesheet["navigation"]} ${stylesheet["opened"]}`
              : stylesheet["navigation"]
          }
          id={"menu"}
          tabIndex={"-1"}
          style={{
            height: menuOpen ? renderLinks.length * 50 + "px" : undefined
          }}
        >
          {renderLinks.map(({ key, href, label, className }) => (
            <li
              key={key}
              className={
                currentPage === href
                  ? `${stylesheet[className]} ${stylesheet["active"]}`
                  : stylesheet[className]
              }
            >
              <Link prefetch href={href}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
Navigation.propTypes = {
  currentPage: string.isRequired,
  menuOpen: bool.isRequired
};
function mapStateToProps(state) {
  return {
    menuOpen: state.menus.menuOpen
  };
}
export default connect(mapStateToProps)(Navigation);
