import React from "react";
import Head from "../../../components/head";
import ForgotContainer from "../../../Containers/ForgotContainer";

import stylesheet from "./index.css";

function Forgot() {
  return (
    <React.Fragment>
      <Head title="Forgot Password - Amazon Giveaway List" />
      <div className={"content"}>
        <ForgotContainer />
      </div>
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}
export default Forgot;
