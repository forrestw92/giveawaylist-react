import App, { Container } from "next/app";
import React from "react";
import Router from "next/router";
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

import global from "./global.js";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { giveawayToken } = parseCookies(ctx);
    const protectedRoutes = ["/profile", "/profile/reset", "/profile/forgot"];

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

    if (!ctx.store.getState().user.loggedIn) {
      if (!giveawayToken) {
        if (protectedRoutes.indexOf(ctx.pathname) !== -1) {
          if (ctx.res) {
            ctx.res.writeHead(302, {
              Location: "/profile/login"
            });
            ctx.res.end();
          } else {
            Router.push("/profile/login");
          }
        }
        return { pageProps };
      }
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
          <style jsx>{global}</style>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
