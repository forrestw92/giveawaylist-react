import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { initializeStore } from "../Redux/store";
import withRedux from "next-redux-wrapper";
import Layout from "../components/Layout";
class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
