import React from "react";
import Link from "next/link";

import stylesheet from "./index.css";
function AdSpace() {
  return (
    <div className="advspace">
      <div className="advcard">
        <Link href={"/contact"} shallow>
          <a href={"/contact"} className="advtext">
            Advertise Here!
          </a>
        </Link>
      </div>
      <style jsx>{stylesheet}</style>
    </div>
  );
}
export default AdSpace;
