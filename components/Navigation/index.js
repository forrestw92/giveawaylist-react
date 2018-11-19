import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bool, string } from "prop-types";
import stylesheet from "./index.css";
import Home from "../../static/icons/home.svg";
import Clock from "../../static/icons/clock.svg";
import Saved from "../../static/icons/saved.svg";
import Book from "../../static/icons/book.svg";
import User from "../../static/icons/user.svg";
import UserRegister from "../../static/icons/user-plus.svg";
import UserLogin from "../../static/icons/log-in.svg";
import Logo from "../../static/logo.svg";

export class Navigation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        {
          href: "/",
          label: "Home",
          shouldRender: true,
          className: "nav--item",
          image: <Home className={stylesheet["link--image"]} />
        },
        {
          href: "/ending",
          label: "Ending",
          shouldRender: true,
          className: "nav--item",
          image: <Clock className={stylesheet["link--image"]} />
        },
        {
          href: "/saved",
          label: "Saved",
          shouldRender: false,
          className: "nav--item",
          image: <Saved className={stylesheet["link--image"]} />
        },
        {
          href: "/ebooks",
          label: "eBooks",
          shouldRender: true,
          className: "nav--item",
          image: <Book className={stylesheet["link--image"]} />
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
          className: "nav--item",
          image: <User className={stylesheet["link--image"]} />
        },
        {
          href: "/profile/login",
          label: "Login",
          shouldRender: false,
          className: "nav--item",
          image: <UserLogin className={stylesheet["link--image"]} />
        },
        {
          href: "/profile/register",
          label: "Register",
          shouldRender: false,
          className: "nav--item",
          image: <UserRegister className={stylesheet["link--image"]} />
        }
      ]
    };
  }
  static getDerivedStateFromProps(prevProps, state) {
    if (prevProps.currentPage === "/profile/login") {
      return state.links.map(link => {
        if (link.href === "/profile/login") {
          link.shouldRender = true;
        }
        if (link.href === "/profile") {
          link.shouldRender = false;
        }
        if (link.href === "/profile/register") {
          link.shouldRender = false;
        }
      });
    }
    if (prevProps.currentPage === "/profile/register") {
      return state.links.map(link => {
        if (link.href === "/profile/register") {
          link.shouldRender = true;
        }
        if (link.href === "/profile") {
          link.shouldRender = false;
        }
        if (link.href === "/profile/login") {
          link.shouldRender = false;
        }
      });
    }
    return null;
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

  render() {
    const renderLinks = this.state.links.filter(link => link.shouldRender);
    const { currentPage } = this.props;
    return (
      <nav role="navigation">
        <Logo className={stylesheet["logo"]} />
        <ul className={stylesheet["navigation"]} id={"menu"} tabIndex={"-1"}>
          {renderLinks.map(({ href, label, image, className }) => (
            <li key={href} className={`${stylesheet[className]}`}>
              <Link prefetch href={href}>
                <a
                  className={
                    currentPage === href
                      ? `${stylesheet["link"]} ${stylesheet["active"]}`
                      : stylesheet["link"]
                  }
                >
                  {image}
                  <span>{label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
Navigation.propTypes = {
  loggedIn: bool.isRequired,
  currentPage: string.isRequired
};
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    currentPage: state.nav.currentPage
  };
}
export default connect(mapStateToProps)(Navigation);
