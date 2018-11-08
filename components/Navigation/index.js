import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { bool } from "prop-types";
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
          className: "nav--item",
          image: "../../static/icons/home.svg"
        },
        {
          href: "/ending",
          label: "Ending",
          shouldRender: true,
          className: "nav--item",
          image: "../../static/icons/clock.svg"
        },
        {
          href: "/saved",
          label: "Saved",
          shouldRender: false,
          className: "nav--item",
          image: "../../static/icons/saved.svg"
        },
        {
          href: "/ebooks",
          label: "eBooks",
          shouldRender: true,
          className: "nav--item",
          image: "../../static/icons/book.svg"
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
          image: "../../static/icons/user.svg"
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
    const renderLinks = this.state.links.filter(link => link.shouldRender);
    return (
      <nav role="navigation">
        <img
          src="../../static/logo.svg"
          className={stylesheet["logo"]}
          alt="Giveaway List Logo"
        />
        <ul className={stylesheet["navigation"]} id={"menu"} tabIndex={"-1"}>
          {renderLinks.map(({ href, label, image, className }) => (
            <li
              key={href}
              className={`${stylesheet[className]} ${stylesheet["active"]}`}
            >
              <Link prefetch href={href}>
                <a className={stylesheet["link"]}>
                  <img src={image} className={stylesheet["link--image"]} />
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
  loggedIn: bool.isRequired
};
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn
  };
}
export default connect(mapStateToProps)(Navigation);
