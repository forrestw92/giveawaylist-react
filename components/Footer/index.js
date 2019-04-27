import React from "react";
import Link from "next/link";
import stylesheet from "./index.css";
const footerOutLinks = [
  { link: "https://blog.giveawaylist.com", text: " Blog " },
  { link: "https://giveawaylist.com/contact.php", text: " Contact " },
  { link: "https://forrestwalker.net", text: " Portfolio " }
];
const footerInLinks = [
  { link: "/privacy", text: " Privacy Policy " },
  { link: "/tos", text: " Terms Of Service " }
];
class Footer extends React.Component {
  render() {
    return (
      <footer className={"footer"} role="contentinfo">
        <div className="info">
          <ul className="footer--links">
            {footerOutLinks &&
              footerOutLinks.map((item, idx) => (
                <li key={idx}>
                  <a href={item.link} className={"link"}>
                    {item.text}
                  </a>
                </li>
              ))}
          </ul>
          <ul className="footer--links">
            {footerInLinks &&
              footerInLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link} shallow>
                    <a href={item.link} className={"link"}>
                      {item.text}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
          <p>&copy; 2017 - {new Date().getFullYear()}, Giveaway List</p>
          <p>
            All product names, logos, and brands are property of their
            respective owners.
          </p>
        </div>
        {/*language=CSS*/}
        <style jsx>{stylesheet}</style>
      </footer>
    );
  }
}
export default Footer;
