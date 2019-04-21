import React from "react";
import cookies from "next-cookies";
import { setBearer, validateAccount } from "../../../API";
import Head from "../../../components/head";
import Header from "../../../components/Header";
import "../../global.css";
import LoginContainer from "../../../Containers/LoginContainer";
import { userLogin } from "../../../Redux/actions/loginActions";
class Login extends React.Component {
  static async getInitialProps({ req, res, store }) {
    const ctx = { req };
    const { giveawayToken } = cookies(ctx);
    if (giveawayToken) {
      setBearer(giveawayToken);

      await validateAccount({ token: giveawayToken })
        .then(result => {
          if (result.data.isvalid) {
            const user = { ...result.data, token: giveawayToken };
            store.dispatch(userLogin(user));
          }
        })
        .catch(({ response }) => {
          if (!response.data.isvalid) {
            if (res) {
              res.clearCookie("giveawayToken");
            } else {
              document.cookie =
                "giveawayToken=; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            }
          }
        });
    }
    return {};
  }
  render() {
    return (
      <React.Fragment>
        <Head title="Amazon Giveaway List - Login" />
        <Header />
        <div className={"content"}>
          <LoginContainer />
        </div>
        <style jsx scoped>
          {`
            .content {
              margin: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default Login;
