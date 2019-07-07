import React from "react";
import Navigation from "../Navigation";
import stylesheet from "./index.css";
function Header() {
  return (
    <header className="header">
      <Navigation />
      <style jsx>{stylesheet}</style>
    </header>
  );
}
export default Header;
