import React from "react";
import Link from "next/link";
import stylesheet from "./index.css";
const footerOutLinks = [
  {
    link: "https://www.buymeacoffee.com/giveawaylist",
    children: (
      <img
        src={"https://giveawaylist.b-cdn.net/bmc-button.png"}
        alt={"Buy me a coffee"}
        height={37}
        width={170}
      />
    ),
    fullWidth: true
  },
  { link: "https://blog.giveawaylist.com", children: " Blog " },
  { link: "https://giveawaylist.com/contact", children: " Contact " },
  { link: "https://forrestwalker.net", children: " Portfolio " }
];
const footerInLinks = [
  { link: "/privacy", children: " Privacy Policy " },
  { link: "/tos", children: " Terms Of Service " }
];

function Footer() {
  return (
    <footer className={"footer"} role="contentinfo">
      <div className="info">
        <ul className="footer--links">
          {footerOutLinks &&
            footerOutLinks.map((item, idx) => (
              <li key={idx} className={item.fullWidth && "full"}>
                <a href={item.link} className={`link `}>
                  {item.children}
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
                    {item.children}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        <p>&copy; 2017 - {new Date().getFullYear()}, Giveaway List</p>
        <p>
          All product names, logos, and brands are property of their respective
          owners.
        </p>
      </div>
      <style jsx>{stylesheet}</style>
    </footer>
  );
}

export default Footer;
