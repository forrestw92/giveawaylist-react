import React from "react";
import { string } from "prop-types";
import Head from "../../../components/head";
import stylesheet from "./index.css";
import { unsubscribeNewsletter } from "../../../API";
class Unsubscribe extends React.Component {
  static async getInitialProps({ req }) {
    const { email, unsubscribe_key } = req.query;
    if (!email || !unsubscribe_key) {
      return {
        message:
          "Make sure you click the correct unsubscribe link in the email."
      };
    }
    return await unsubscribeNewsletter({ email, unsubscribe_key })
      .then(({ data }) => {
        const { unsubscribe } = data;
        if (unsubscribe) {
          return { message: "You are now unsubscribed." };
        }
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        console.log(response.data);
        return { message: msg };
      });
  }
  render() {
    const { message } = this.props;
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
}
Unsubscribe.propTypes = {
  message: string.isRequired
};
export default Unsubscribe;
