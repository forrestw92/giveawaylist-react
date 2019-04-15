import React from "react";
import stylesheet from "./index.css";
const footerLinks = [
  { link: "https://blog.giveawaylist.com", text: " Blog " },
  { link: "https://giveawaylist.com/contact.php", text: " Contact " },
  { link: "https://forrestwalker.net", text: " Portfolio " }
];
class Footer extends React.Component {
  render() {
    return (
      <footer className={stylesheet.footer}>
        {footerLinks.map((item, idx) => (
          <a key={idx} href={item.link}>
            {item.text}
          </a>
        ))}
      </footer>
    );
  }
}
export default Footer;
