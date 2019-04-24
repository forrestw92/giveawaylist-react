import React from "react";
import Navigation from "../Navigation";
class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Navigation />
        {/*language=CSS*/}
        <style jsx>{`
          .header {
            background: #1d3557;
            width: 100%;
            height: 70px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            position: relative;
          }
        `}</style>
      </header>
    );
  }
}
export default Header;
