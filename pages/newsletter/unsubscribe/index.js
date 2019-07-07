import React from "react";
import { string } from "prop-types";
import Head from "../../../components/head";
import stylesheet from "./index.css";
import { unsubscribeNewsletter } from "../../../API";

function Unsubscribe(props) {
  const { message } = props;
  return (
    <React.Fragment>
      <Head title="Unsubscribe - Amazon Giveaway List" description={""} />
      <main className={"content"}>
        <div className={"notify"}>
          <b>{message}</b>
        </div>
        <style jsx>{stylesheet}</style>
      </main>
    </React.Fragment>
  );
}

Unsubscribe.getInitialProps = async ({ req }) => {
  const { email, key } = req.query;
  if (!email || !key) {
    return {
      message: "Make sure you click the correct unsubscribe link in the email."
    };
  }
  return await unsubscribeNewsletter({ email, unsubscribe_key: key })
    .then(({ data }) => {
      const { unsubscribe } = data;
      if (unsubscribe) {
        return { message: "You are now unsubscribed." };
      }
    })
    .catch(({ response }) => {
      const { msg } = response.data;
      return { message: msg };
    });
};
Unsubscribe.propTypes = {
  message: string.isRequired
};
export default Unsubscribe;
