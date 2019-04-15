import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { initializeStore } from "../Redux/store";
import withRedux from "next-redux-wrapper";
import Layout from "../components/Layout";
import { setCurrentPage } from "../Redux/actions/navActions";
import Footer from "../components/Footer";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    await ctx.store.dispatch(setCurrentPage(ctx.pathname));
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
            <Footer />
          </Layout>
        </Provider>
        <style jsx global>
          {`
            #__next {
              overflow: hidden;
            }
          `}
        </style>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
