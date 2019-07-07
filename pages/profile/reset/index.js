import React from "react";
import Head from "../../../components/head";

import stylesheet from "./index.css";
import ResetContainer from "../../../Containers/ResetContainer";

function Forgot() {
  return (
    <React.Fragment>
      <Head title="Reset Password - Amazon Giveaway List" />
      <div className={"content"}>
        <ResetContainer />
      </div>
      <style jsx>{stylesheet}</style>
    </React.Fragment>
  );
}
export default Forgot;
