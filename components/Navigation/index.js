import React from "react";
import { string } from "prop-types";
import stylesheet from "./index.css";
import Link from "next/link";
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
    href: "/sweepstakes",
    label: "Sweepstakes",
    isActive: true,
    shouldRender: true,
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
    return (
      <nav>
        <ul className={stylesheet["navigation"]}>
          {links.map(({ key, href, label, className }) => (
            <li key={key} className={stylesheet[className]}>
              <Link href={href}>
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
  currentPage: string.isRequired
};
export default Navigation;
