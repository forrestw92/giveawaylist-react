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
      <footer className={"footer"}>
        {footerLinks.map((item, idx) => (
          <a key={idx} href={item.link} className={"link"}>
            {item.text}
          </a>
        ))}
        {/*language=CSS*/}
        <style jsx>{stylesheet}</style>
      </footer>
    );
  }
}
export default Footer;
