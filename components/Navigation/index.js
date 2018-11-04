import React from "react";
import Router from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { string, bool } from "prop-types";
import stylesheet from "./index.css";
class Navigation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        {
          href: "/",
          label: "Home",
          shouldRender: true,
          className: "nav--item"
        },
        {
          href: "/ending",
          label: "Ending Giveaways",
          shouldRender: true,
          className: "nav--item"
        },
        {
          href: "/saved",
          label: "Saved Giveaways",
          shouldRender: false,
          className: "nav--item"
        },
        {
          href: "/ebooks",
          label: "eBooks Giveaways",
          shouldRender: true,
          className: "nav--item"
        },
        {
          href: "/sweepstakes",
          label: "Sweepstakes",
          shouldRender: false,
          className: "nav--item"
        },
        {
          href: "/profile",
          label: "Profile",
          shouldRender: true,
          className: "nav--item"
        },
        {
          href: "/profile/register",
          label: "Register",
          shouldRender: false,
          className: "nav--item"
        }
      ]
    };
  }
  componentDidMount() {
    if (this.props.loggedIn) {
      const links = this.state.links.map(item => {
        if (item.href === "/saved") {
          item.shouldRender = !item.shouldRender;
        }
        return item;
      });
      this.setState({ links });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      const links = this.state.links.map(item => {
        if (
          item.href === "/profile" ||
          item.href === "/profile/login" ||
          item.href === "/saved"
        ) {
          item.shouldRender = !item.shouldRender;
        }
        return item;
      });

      console.log(links);
      this.setState({ links });
    }
  }
  render() {
    const { currentPage, menuOpen } = this.props;
    const renderLinks = this.state.links.filter(link => link.shouldRender);
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
          {renderLinks.map(({ href, label, className }) => (
            <li
              key={href}
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
  menuOpen: bool.isRequired,
  loggedIn: bool.isRequired
};
function mapStateToProps(state) {
  return {
    menuOpen: state.menus.menuOpen,
    loggedIn: state.user.loggedIn
  };
}
export default connect(mapStateToProps)(Navigation);
