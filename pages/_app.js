import App, { Container } from "next/app";
import React from "react";
import { parseCookies, destroyCookie } from "nookies";

import { Provider } from "react-redux";
import { initializeStore } from "../Redux/store";
import withRedux from "next-redux-wrapper";
import {
  deleteGiveaways,
  fetchGiveaways
} from "../Redux/actions/giveawayActions";
import { userLogin, userLogout } from "../Redux/actions/loginActions";
import { setCurrentPage } from "../Redux/actions/navActions";

import { setBearer, userDetails } from "../API";

import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { giveawayToken } = parseCookies(ctx);
    let pageProps = {};
    await ctx.store.dispatch(setCurrentPage(ctx.pathname));

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (!process.browser && !ctx.pathname.includes("/profile")) {
      await ctx.store.dispatch(fetchGiveaways());
    } else {
      await ctx.store.dispatch(deleteGiveaways());
    }
    if (giveawayToken && !ctx.store.getState().user.loggedIn) {
      setBearer(giveawayToken);
      await userDetails()
        .then(result => {
          if (result.data.userDetails) {
            const user = { ...result.data, token: giveawayToken };
            ctx.store.dispatch(userLogin(user));
          }
        })
        .catch(({ response }) => {
          if (response === undefined) {
            return;
          }
          if (response.data.error === "INVALID_AUTHORIZATION") {
            ctx.store.dispatch(userLogout());
            if (ctx.res) {
              destroyCookie(ctx, "giveawayToken", {});
              ctx.res.writeHead(302, {
                Location: "/profile/login"
              });
              ctx.res.end();
            }
          }
        });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
